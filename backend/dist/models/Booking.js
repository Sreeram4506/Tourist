"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BookingSchema = new mongoose_1.default.Schema({
    experienceId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Experience' },
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
exports.default = mongoose_1.default.model('Booking', BookingSchema);
