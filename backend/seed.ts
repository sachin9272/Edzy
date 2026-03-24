import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Snack from './models/Snack';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/edzy-canteen';

const snacks = [
  { name: 'Samosa', price: 15, ordersCount: 0 },
  { name: 'Veg Sandwich', price: 30, ordersCount: 0 },
  { name: 'Paneer Roll', price: 40, ordersCount: 0 },
  { name: 'Fresh Juice', price: 25, ordersCount: 0 },
  { name: 'Chips Packet', price: 10, ordersCount: 0 },
  { name: 'Cold Coffee', price: 35, ordersCount: 0 },
  { name: 'Masala Dosa', price: 45, ordersCount: 0 },
  { name: 'Aloo Tikki', price: 20, ordersCount: 0 },
  { name: 'Spring Roll', price: 35, ordersCount: 0 },
  { name: 'Mango Lassi', price: 30, ordersCount: 0 },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing snacks
    await Snack.deleteMany({});
    console.log('🗑️  Cleared existing snacks');

    // Insert seed data
    const createdSnacks = await Snack.insertMany(snacks);
    console.log(`🌱 Seeded ${createdSnacks.length} snacks:`);
    createdSnacks.forEach((s) => {
      console.log(`   - ${s.name}: ₹${s.price}`);
    });

    await mongoose.disconnect();
    console.log('✅ Done! Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
