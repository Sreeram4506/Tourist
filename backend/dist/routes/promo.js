"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Promo_1 = __importDefault(require("../models/Promo"));
const router = express_1.default.Router();
// POST /promo/validate
router.post('/validate', async (req, res) => {
    try {
        const { code } = req.body;
        const promo = await Promo_1.default.findOne({ code: code.toUpperCase() });
        if (!promo) {
            return res.json({ valid: false, message: 'Invalid promo code' });
        }
        // Check expiry
        if (promo.expiresAt && new Date() > promo.expiresAt) {
            return res.json({ valid: false, message: 'Promo code expired' });
        }
        res.json({
            valid: true,
            type: promo.type,
            amount: promo.amount
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error validating promo' });
    }
});
exports.default = router;
