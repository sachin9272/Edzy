import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import snackRoutes from './routes/snacks';
import studentRoutes from './routes/students';
import orderRoutes from './routes/orders';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/edzy-canteen';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/snacks', snackRoutes);
app.use('/students', studentRoutes);
app.use('/orders', orderRoutes);

// Health check
app.get('/', (_req, res) => {
  res.json({ message: 'Canteen API is running!', status: 'ok' });
});

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

export default app;
