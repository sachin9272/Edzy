import { Router, Request, Response } from 'express';
import Snack from '../models/Snack';

const router = Router();

// GET /snacks
router.get('/', async (_req: Request, res: Response) => {
  try {
    const snacks = await Snack.find().sort({ name: 1 });
    res.json(snacks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch snacks', error });
  }
});

// POST /snacks
router.post('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, price } = req.body;
    if (!name || typeof price !== 'number') {
      return res.status(400).json({ message: 'Name and a valid price are required' });
    }
    const snack = new Snack({ name, price });
    await snack.save();
    return res.status(201).json(snack);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create snack', error });
  }
});

export default router;
