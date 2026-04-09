process.on('uncaughtException', e => console.error('UNCAUGHT EXCEPTION:', e.stack));
process.on('unhandledRejection', e => console.error('UNHANDLED REJECTION:', e));

const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Global error handler MUST be defined before routes in Express 5
app.use((err, req, res, next) => {
  console.error('EXPRESS ERROR HANDLER:', err.stack);
  res.status(500).json({ error: err.message });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB OK');

    const roomRoutes = require('./routes/roomRoutes');
    app.use('/api/rooms', roomRoutes);

    // Add error handler AFTER routes
    app.use((err, req, res, next) => {
      console.error('ROUTE ERROR:', err.stack);
      res.status(500).json({ error: err.message });
    });

    app.listen(5001, () => console.log('🧪 Diagnostic server on port 5001'));
  })
  .catch(e => console.error('❌ DB Error:', e.message));
