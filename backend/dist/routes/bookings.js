"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Booking_1 = __importDefault(require("../models/Booking"));
const Experience_1 = __importDefault(require("../models/Experience"));
const router = express_1.default.Router();
// POST /bookings
router.post('/', async (req, res) => {
    try {
        const { experienceId, slotId, date, customer, seats, promoCode, amountPaid } = req.body;
        // Check slot availability
        const experience = await Experience_1.default.findById(experienceId);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        const slot = experience.slots.find(s => s.slotId === slotId);
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        if (slot.booked + seats > (slot.capacity || 0)) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }
        // Atomic update to increment booked
        const updateResult = await Experience_1.default.updateOne({ _id: experienceId, "slots.slotId": slotId, "slots.booked": { $lte: (slot.capacity || 0) - seats } }, { $inc: { "slots.$.booked": seats } });
        if (updateResult.modifiedCount === 0) {
            return res.status(400).json({ message: 'Booking failed, seats not available' });
        }
        // Create booking
        const booking = new Booking_1.default({
            experienceId,
            slotId,
            date,
            customer,
            seats,
            amountPaid,
            promoCode
        });
        await booking.save();
        res.json({
            success: true,
            bookingId: booking._id,
            status: 'confirmed',
            details: booking
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating booking' });
    }
});
exports.default = router;
