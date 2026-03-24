import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  student: mongoose.Types.ObjectId;
  snack: mongoose.Types.ObjectId;
  quantity: number;
  payableAmount: number;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Student is required'],
  },
  snack: {
    type: Schema.Types.ObjectId,
    ref: 'Snack',
    required: [true, 'Snack is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Minimum quantity is 1'],
    max: [5, 'Maximum quantity is 5'],
  },
  payableAmount: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IOrder>('Order', OrderSchema);
