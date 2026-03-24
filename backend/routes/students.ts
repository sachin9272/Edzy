import { Router, Request, Response } from 'express';
import Student from '../models/Student';
import Order from '../models/Order';

const router = Router();

// GET /students — return all students
router.get('/', async (_req: Request, res: Response) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students', error });
  }
});

// GET /students/:id — return student with their orders
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    const orders = await Order.find({ student: student._id })
      .populate('snack', 'name price')
      .sort({ createdAt: -1 });

    res.json({ student, orders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch student', error });
  }
});

// POST /students — create a new student
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || name.trim().length === 0) {
      res.status(400).json({ message: 'Student name is required' });
      return;
    }

    const student = new Student({ name: name.trim() });
    await student.save();

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create student', error });
  }
});

export default router;
