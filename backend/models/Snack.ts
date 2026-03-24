import mongoose, { Schema, Document } from 'mongoose';

export interface ISnack extends Document {
  name: string;
  price: number;
  ordersCount: number;
}

const SnackSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Snack name is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  ordersCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model<ISnack>('Snack', SnackSchema);
