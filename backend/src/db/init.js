const { pool } = require('./index');
const fs = require('fs');
const path = require('path');

const initDb = async () => {
  try {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await pool.query(schema);
    console.log('Database tables initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
    console.error('Database initialization failed. Check your DATABASE_URL and connection.');
    process.exit(1);
  }
};

module.exports = initDb;
