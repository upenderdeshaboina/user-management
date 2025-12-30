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

//validate ADMIN_EMAIL and ADMIN_PASSWORD
if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
  console.error('ERROR: ADMIN_EMAIL or ADMIN_PASSWORD environment variable not set');
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database and seeding admin data only once
console.log('Starting database initialization...')
initDb()
  .then(async () => {
    console.log('DB init completed — checking/creating admin account..')
    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';

      const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [adminEmail]);
      console.log('Admin lookup result rows count:', rows && rows.length)

      if (!rows || rows.length === 0) {
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'testAdmin@123', 10);
        await db.query(
          'INSERT INTO users (full_name, email, password, role, status) VALUES ($1, $2, $3, $4, $5)',
          ['adminUser', adminEmail, hashedPassword, 'admin', 'active']
        );
        console.log('Admin account seeded successfully');
      } else {
        console.log('Admin account already exists; skipping seed');
      }
    } catch (error) {
      console.error('Error seeding admin:', error);
    }
  })
  .catch((err) => {
    console.error('Database initialization failed initDb rejected:', err);
  });

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
