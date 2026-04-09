const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const quizRoutes = require('./routes/quizRoutes');
const resultsRoutes = require('./routes/resultsRoutes');

const app = express();

// Middleware
app.use(cors()); // Allow all origins for production testing
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/results', resultsRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Quiz Battle API is running!' });
});

// Global error handler — MUST be after all routes
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Catch uncaught exceptions so the process doesn't crash silently
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err.stack);
});
process.on('unhandledRejection', (reason) => {
  console.error('💥 Unhandled Rejection:', reason);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});