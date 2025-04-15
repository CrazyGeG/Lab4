const express = require('express');
const path = require('path');
const studentRoutes = require('./routes/students');

const app = express();

// Middleware
app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes - MUST come before static files
app.use('/api', studentRoutes);

// Static files - ONLY in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname)));
  
//   // Catch-all route - MUST be last
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
//   });
// }
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const express = require('express');
// const app = express();

// // Test basic route BEFORE mounting studentRoutes
// app.get('/api/test', (req, res) => res.send('API test working'));

// // Comment out studentRoutes temporarily
// app.use('/api', require('./routes/students'));

// app.listen(3000, () => console.log('Testing without studentRoutes'));
