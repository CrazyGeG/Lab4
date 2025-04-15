// routes/students_hybrid.js
const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// 1. Start with simple route
router.get('/simple', (req, res) => res.send('Simple route works'));

// 2. Add DB query without parameters
router.get('/all', (req, res) => {
  db.all('SELECT * FROM students LIMIT 1', (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// 3. Add parameterized route
router.get('/students/:id', (req, res) => {
    console.log('Received ID:', req.params.id); // Add this line
    db.get('SELECT * FROM students WHERE id = ?', [req.params.id], (err, row) => {
      if (err) return res.status(500).send(err.message);
      res.json(row || {error: 'Not found'});
    });
  });

module.exports = router;