import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience' },
  slotId: String,
  date: String,
  customer: {
    name: String,
    email: String,
    phone: String
  },
  seats: Number,
  amountPaid: Number,
  promoCode: String,
  status: { type: String, enum: ['confirmed', 'cancelled', 'pending'], default: 'confirmed' }
}, { timestamps: true });

// Unique index to prevent duplicate confirmed bookings for same slot and customer if desired:
BookingSchema.index({ slotId: 1, date: 1, 'customer.email': 1 });

export default mongoose.model('Booking', BookingSchema);
