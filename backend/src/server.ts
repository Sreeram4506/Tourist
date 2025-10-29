import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import experiencesRouter from './routes/experiences';
import bookingsRouter from './routes/bookings';
import promoRouter from './routes/promo';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/experiences', experiencesRouter);
app.use('/bookings', bookingsRouter);
app.use('/promo', promoRouter);

// Ping route
app.get('/ping', (req, res) => res.json({ message: 'Backend is running' }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
