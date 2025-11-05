import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Initialize SQLite DB
const db = new sqlite3.Database('./booking.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    startTime TEXT,
    endTime TEXT,
    duration INTEGER,
    courtId TEXT,
    courtName TEXT,
    basePrice REAL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS participants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bookingId INTEGER,
    name TEXT,
    isOrganizer INTEGER,
    FOREIGN KEY(bookingId) REFERENCES bookings(id)
  )`);
});

// API to add a booking
app.post('/api/bookings', (req, res) => {
  const { date, startTime, endTime, duration, courtId, courtName, basePrice, participants } = req.body;
  db.run(
    `INSERT INTO bookings (date, startTime, endTime, duration, courtId, courtName, basePrice) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [date, startTime, endTime, duration, courtId, courtName, basePrice],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      const bookingId = this.lastID;
      if (participants && participants.length) {
        const stmt = db.prepare(`INSERT INTO participants (bookingId, name, isOrganizer) VALUES (?, ?, ?)`);
        participants.forEach(p => {
          stmt.run(bookingId, p.name, p.isOrganizer ? 1 : 0);
        });
        stmt.finalize();
      }
      res.json({ bookingId });
    }
  );
});

// API to get all bookings
app.get('/api/bookings', (req, res) => {
  db.all(`SELECT * FROM bookings`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// API to get participants for a booking
app.get('/api/bookings/:id/participants', (req, res) => {
  db.all(`SELECT * FROM participants WHERE bookingId = ?`, [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Serve static files from dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing, return all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Frontend available at http://localhost:${PORT}`);
}); 