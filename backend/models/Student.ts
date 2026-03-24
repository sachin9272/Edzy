import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  referralCode: string;
  totalSpent: number;
}

const generateReferralCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'STU-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const StudentSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
  },
  referralCode: {
    type: String,
    unique: true,
    default: generateReferralCode,
  },
  totalSpent: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IStudent>('Student', StudentSchema);
