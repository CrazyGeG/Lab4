const express = require('express');
const db = require('../db/connection');
const debug = require('debug')('students:routes');
const router = express.Router();

// Error wrapper for DB operations
const handleDBError = (err, res) => {
  debug('Database error:', err);
  res.status(500).json({ error: err.message });
};

// Test API endpoint
router.get('/test', (req, res) => {
  res.json({ message: "API is working!" });
});

// Get all students
router.get('/students', (req, res) => {
  db.all('SELECT * FROM students', (err, rows) => {
    if (err) return handleDBError(err, res);
    res.json(rows);
  });
});

// Get a student by ID
router.get('/students/:id', (req, res) => {
  db.get('SELECT * FROM students WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return handleDBError(err, res);
    if (!row) return res.status(404).json({ error: 'Student not found' });
    res.json(row);
  });
});

// Create a new student
router.post('/students', (req, res) => {
  const { name, age, email, major, gpa } = req.body;
  if (!name || !age || !email || !major || !gpa) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.run(
    'INSERT INTO students (name, age, email, major, gpa) VALUES (?, ?, ?, ?, ?)',
    [name, age, email, major, gpa],
    function (err) {
      if (err) return handleDBError(err, res);
      res.json({ id: this.lastID });
    }
  );
});

// Update an existing student (PUT)
router.put('/students/:id', (req, res) => {
  const { name, age, email, major, gpa } = req.body;
  if (!name || !age || !email || !major || !gpa) {
    return res.status(400).json({ error: 'All fields are required for update' });
  }

  db.run(
    'UPDATE students SET name = ?, age = ?, email = ?, major = ?, gpa = ? WHERE id = ?',
    [name, age, email, major, gpa, req.params.id],
    function (err) {
      if (err) return handleDBError(err, res);
      res.json({ changes: this.changes });
    }
  );
});

// Partially update a student (PATCH)
router.patch('/students/:id', (req, res) => {
  const updates = [];
  const values = [];
  
  for (const [key, value] of Object.entries(req.body)) {
    updates.push(`${key} = ?`);
    values.push(value);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  const sql = `UPDATE students SET ${updates.join(', ')} WHERE id = ?`;
  values.push(req.params.id);

  db.run(sql, values, function (err) {
    if (err) return handleDBError(err, res);
    res.json({ changes: this.changes });
  });
});

// Delete a student
router.delete('/students/:id', (req, res) => {
  db.run('DELETE FROM students WHERE id = ?', [req.params.id], function (err) {
    if (err) return handleDBError(err, res);
    res.json({ changes: this.changes });
  });
});

module.exports = router;
