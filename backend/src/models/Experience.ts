import mongoose from 'mongoose';

const SlotSchema = new mongoose.Schema({
  slotId: String,
  date: String,         // YYYY-MM-DD
  startTime: String,    // "17:00"
  endTime: String,
  capacity: Number,
  price: Number,
  booked: { type: Number, default: 0 }
});

const ExperienceSchema = new mongoose.Schema({
  title: String,
  shortDesc: String,
  description: String,
  images: [String],
  location: String,
  price: Number,
  rating: Number,
  slots: [SlotSchema]
});

export default mongoose.model('Experience', ExperienceSchema);
