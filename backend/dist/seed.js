"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Experience_1 = __importDefault(require("./models/Experience"));
const Promo_1 = __importDefault(require("./models/Promo"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const seedData = async () => {
    await mongoose_1.default.connect(process.env.MONGO_URI);
    // Clear existing data
    await Experience_1.default.deleteMany({});
    await Promo_1.default.deleteMany({});
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
    await Experience_1.default.insertMany(experiences);
    // Sample promos
    const promos = [
        { code: 'SAVE10', type: 'percent', amount: 10, expiresAt: new Date('2025-12-31'), usageLimit: 100 },
        { code: 'FLAT100', type: 'flat', amount: 100, expiresAt: new Date('2025-12-31'), usageLimit: 50 }
    ];
    await Promo_1.default.insertMany(promos);
    console.log('Data seeded successfully');
    process.exit();
};
seedData().catch(console.error);
