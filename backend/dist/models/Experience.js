"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SlotSchema = new mongoose_1.default.Schema({
    slotId: String,
    date: String, // YYYY-MM-DD
    startTime: String, // "17:00"
    endTime: String,
    capacity: Number,
    price: Number,
    booked: { type: Number, default: 0 }
});
const ExperienceSchema = new mongoose_1.default.Schema({
    title: String,
    shortDesc: String,
    description: String,
    images: [String],
    location: String,
    price: Number,
    rating: Number,
    slots: [SlotSchema]
});
exports.default = mongoose_1.default.model('Experience', ExperienceSchema);
