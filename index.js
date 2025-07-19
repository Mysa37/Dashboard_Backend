const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// ✅ Load environment variables from .env
dotenv.config();

// ✅ Initialize Express app
const app = express();

// ✅ Middleware
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000']
}));
app.use(express.json());

// ✅ Routes
const dashboardRoutes = require('./routes/dashboard');
app.use('/api/data', dashboardRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('✅ Backend is working and deployed!');
});

// ✅ Connect to MongoDB and start server
const PORT = process.env.PORT || 5003;

mongoose.connect(process.env.MONGO_URI, {
  dbName: 'analytics_dashboard',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
