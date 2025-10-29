import mongoose from 'mongoose';
import Experience from './models/Experience';
import Promo from './models/Promo';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  await mongoose.connect(process.env.MONGO_URI!);

  // Clear existing data
  await Experience.deleteMany({});
  await Promo.deleteMany({});

  // Sample experiences
  const experiences = [
    {
      title: 'Sunset Kayak',
      shortDesc: '2-hour kayak at sunset',
      description: 'Enjoy a peaceful kayak ride as the sun sets over the horizon.',
      images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'],
      location: 'Goa',
      price: 120,
      rating: 4.8,
      slots: [
        {
          slotId: 'slot_1',
          date: '2025-11-05',
          startTime: '17:00',
          endTime: '19:00',
          capacity: 8,
          price: 120,
          booked: 0
        },
        {
          slotId: 'slot_2',
          date: '2025-11-06',
          startTime: '17:00',
          endTime: '19:00',
          capacity: 8,
          price: 120,
          booked: 0
        }
      ]
    },
    {
      title: 'Mountain Hike',
      shortDesc: 'Guided hike through scenic trails',
      description: 'Explore breathtaking mountain views with an experienced guide.',
      images: ['https://images.unsplash.com/photo-1551632811-561732d1e306?w=400'],
      location: 'Himachal Pradesh',
      price: 80,
      rating: 4.6,
      slots: [
        {
          slotId: 'slot_3',
          date: '2025-11-07',
          startTime: '08:00',
          endTime: '12:00',
          capacity: 10,
          price: 80,
          booked: 0
        }
      ]
    }
  ];

  await Experience.insertMany(experiences);

  // Sample promos
  const promos = [
    { code: 'SAVE10', type: 'percent', amount: 10, expiresAt: new Date('2025-12-31'), usageLimit: 100 },
    { code: 'FLAT100', type: 'flat', amount: 100, expiresAt: new Date('2025-12-31'), usageLimit: 50 }
  ];

  await Promo.insertMany(promos);

  console.log('Data seeded successfully');
  process.exit();
};

seedData().catch(console.error);
