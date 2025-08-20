const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

exports.getReports = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reports');
    res.json(rows);
  } catch (err) {
    console.error('💥 DB ERROR fetching reports:', err);
    res.status(500).json({ message: 'Error fetching reports.' });
  }
};
