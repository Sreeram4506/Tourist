"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PromoSchema = new mongoose_1.default.Schema({
    code: String,
    type: { type: String, enum: ['flat', 'percent'] },
    amount: Number,
    expiresAt: Date,
    usageLimit: Number
});
exports.default = mongoose_1.default.model('Promo', PromoSchema);
