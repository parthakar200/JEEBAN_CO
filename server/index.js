
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');

// dotenv.config();

// const app = express();

// // Middleware
// // Allow configured origin(s) + localhost in dev
// const allowedOrigins = [
//   process.env.CLIENT_URL,          // e.g. https://jeebanco.vercel.app
//   'http://localhost:3000',
//   'http://localhost:3001',
// ].filter(Boolean);

// app.use(cors({
//   origin: (origin, cb) => {
//     // Allow requests with no origin (mobile apps, curl, Postman)
//     if (!origin) return cb(null, true);
//     if (allowedOrigins.includes(origin)) return cb(null, true);
//     cb(new Error(`CORS blocked: ${origin}`));
//   },
//   credentials: true,
// }));
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/services', require('./routes/services'));
// app.use('/api/orders', require('./routes/orders'));
// app.use('/api/users', require('./routes/users'));
// app.use('/api/documents', require('./routes/documents'));
// app.use('/api/contact', require('./routes/contact'));
// app.use('/api/leads', require('./routes/leads'));
// app.use('/api/team', require('./routes/team'));

// // Health check
// app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'jeebanco API Running' }));

// // Serve static files in production
// // if (process.env.NODE_ENV === 'production') {
// //   app.use(express.static(path.join(__dirname, '../client/build')));
// //   app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));
// // }

// // MongoDB Connection
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jeebanco';
// mongoose.connect(MONGO_URI)
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.error('❌ MongoDB Error:', err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:3000',
  'http://localhost:3001',
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/team', require('./routes/team'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'jeebanco API Running' }));

// TEMPORARY SEED ROUTE - REMOVE AFTER USE
const { exec } = require('child_process');
app.get('/api/run-seed', (req, res) => {
  exec('node server/seed.js', (error, stdout, stderr) => {
    res.json({ output: stdout, error: error?.message || stderr });
  });
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jeebanco';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));