// routes/students-test.js
const express = require('express');
const router = express.Router();

// Test route without DB
router.get('/test', (req, res) => res.send('Student routes work'));

module.exports = router;