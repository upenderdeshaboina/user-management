require('dotenv').config();
const express = require('express');
const cors = require('cors');
const initDb = require('./db/init');
const bcrypt = require('bcryptjs');
const db = require('./db/index');

// Validate environment variables
if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET environment variable not set');
  process.exit(1);
}
// Validate DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable not set');
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database and seeding admin
console.log('Starting database initialization...')
initDb()
  

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'User Management System API Checking... success!' });
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
