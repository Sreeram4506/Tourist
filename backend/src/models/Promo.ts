import mongoose from 'mongoose';

const PromoSchema = new mongoose.Schema({
  code: String,
  type: { type: String, enum: ['flat', 'percent'] },
  amount: Number,
  expiresAt: Date,
  usageLimit: Number
});

export default mongoose.model('Promo', PromoSchema);
