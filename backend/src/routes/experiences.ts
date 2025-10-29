import express from 'express';
import Experience from '../models/Experience';

const router = express.Router();

// GET /experiences
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().select('_id title shortDesc images price rating location');
    const formattedExperiences = experiences.map(exp => ({
      _id: exp._id,
      title: exp.title,
      shortDesc: exp.shortDesc,
      image: exp.images[0], // Use first image from array
      price: exp.price,
      rating: exp.rating,
      location: exp.location
    }));
    res.json(formattedExperiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experiences' });
  }
});

// GET /experiences/:id
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experience' });
  }
});

export default router;
