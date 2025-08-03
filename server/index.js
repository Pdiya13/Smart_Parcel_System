// index.js
const express = require('express');
const app = express();

// Middleware to log every request
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// Simple test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});