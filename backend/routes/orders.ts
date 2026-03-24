import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order';
import Snack from '../models/Snack';
import Student from '../models/Student';

const router = Router();

// POST /orders — create a new order
router.post('/', async (req: Request, res: Response) => {
  try {
    const { studentId, snackId, quantity } = req.body;
    console.log('📦 Order request body:', JSON.stringify(req.body));

    // Validation
    if (!studentId || !snackId || !quantity) {
      res.status(400).json({ message: 'studentId, snackId, and quantity are required' });
      return;
    }

    const qty = Number(quantity);
    if (qty < 1 || qty > 5) {
      res.status(400).json({ message: 'Quantity must be between 1 and 5' });
      return;
    }

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(snackId)) {
      res.status(400).json({ message: 'Invalid snack ID format' });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      res.status(400).json({ message: 'Invalid student ID format' });
      return;
    }

    // Find the snack to calculate payable amount
    const snack = await Snack.findById(snackId);
    if (!snack) {
      res.status(404).json({ message: 'Snack not found' });
      return;
    }

    // Find the student
    const student = await Student.findById(studentId);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    const payableAmount = snack.price * qty;

    // Create the order
    const order = new Order({
      student: studentId,
      snack: snackId,
      quantity: qty,
      payableAmount,
    });
    await order.save();

    // Update snack ordersCount
    snack.ordersCount += qty;
    await snack.save();

    // Update student totalSpent
    student.totalSpent += payableAmount;
    await student.save();

    // Populate the order before returning
    const populatedOrder = await Order.findById(order._id)
      .populate('snack', 'name price')
      .populate('student', 'name referralCode');

    res.status(201).json(populatedOrder);
  } catch (error: any) {
    console.error('❌ Order creation error:', error);
    res.status(500).json({ message: error.message || 'Failed to create order' });
  }
});

export default router;
