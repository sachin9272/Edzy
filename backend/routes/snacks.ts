import { Router, Request, Response } from 'express';
import Snack from '../models/Snack';

const router = Router();

// GET /snacks — return all snacks
router.get('/', async (_req: Request, res: Response) => {
  try {
    const snacks = await Snack.find().sort({ name: 1 });
    res.json(snacks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch snacks', error });
  }
});

export default router;
