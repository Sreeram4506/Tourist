# BookIt: Experiences & Slots

A fullstack web application for booking travel experiences with slot management, promo codes, and secure booking system.

## 🚀 Live Demo
- **Frontend**: [Deployed on Vercel](https://your-frontend-url.vercel.app)
- **Backend**: [Deployed on Render](https://your-backend-url.onrender.com)

## 🛠 Tech Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript + MongoDB (Mongoose)
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Frontend) + Render (Backend)

## 📋 Features
- ✅ Browse travel experiences with images and ratings
- ✅ View detailed experience information and available slots
- ✅ Select dates and slots for booking
- ✅ Apply promo codes (SAVE10, FLAT100)
- ✅ Secure booking with double-booking prevention
- ✅ Responsive design for mobile and desktop
- ✅ Form validation and error handling

## 🏃‍♂️ Run Locally

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)
- Git

### Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB connection string
npm install
npm run seed  # Seed sample data
npm run dev   # Start development server on port 5000
```

### Frontend Setup
```bash
cd frontend
cp .env.example .env
# Edit .env with VITE_API_URL=http://localhost:5000
npm install
npm run dev   # Start development server on port 5173
```

## 🚀 Deployment

### Backend (Render)
1. Push backend code to GitHub
2. Connect to Render: https://render.com
3. Create new Web Service
4. Set build command: `npm run build`
5. Set start command: `npm start`
6. Add environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: production
   - `PORT`: 10000

### Frontend (Vercel)
1. Push frontend code to GitHub
2. Connect to Vercel: https://vercel.com
3. Import project from GitHub
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Add environment variable:
   - `VITE_API_URL`: Your Render backend URL

## 📡 API Endpoints

### Experiences
- `GET /experiences` - List all experiences
- `GET /experiences/:id` - Get experience details with slots

### Bookings
- `POST /bookings` - Create new booking
  ```json
  {
    "experienceId": "exp_1",
    "slotId": "slot_1",
    "date": "2025-11-05",
    "customer": { "name": "John", "email": "john@example.com", "phone": "1234567890" },
    "seats": 2,
    "promoCode": "SAVE10",
    "amountPaid": 216
  }
  ```

### Promo Codes
- `POST /promo/validate` - Validate promo code
  ```json
  { "code": "SAVE10" }
  ```

## 🔒 Security Features
- Double-booking prevention using atomic MongoDB operations
- Input validation and sanitization
- CORS enabled for frontend communication
- Environment variable management

## 📱 Responsive Design
- Mobile-first approach with Tailwind CSS
- Optimized for all screen sizes
- Touch-friendly interactions

## 🤝 Contributing
1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License
This project is licensed under the MIT License.

## 📞 Support
For questions or issues, please open a GitHub issue or contact the development team.

## Project Structure
```
bookit/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.tsx
│   └── package.json
└── README.md
