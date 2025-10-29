import express from 'express';
import Promo from '../models/Promo';

const router = express.Router();

// POST /promo/validate
router.post('/validate', async (req, res) => {
  try {
    const { code } = req.body;
    const promo = await Promo.findOne({ code: code.toUpperCase() });

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
  } catch (error) {
    res.status(500).json({ message: 'Error validating promo' });
  }
});

export default router;
