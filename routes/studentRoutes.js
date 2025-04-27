// app.js or server.js (main file)
const express = require('express');
const cors = require('cors'); // Importing CORS

const studentRoutes = require('./routes/studentRoutes'); // Import your routes

const app = express();

// Enable CORS for all origins globally
app.use(cors()); // This will allow all origins for all routes

// Middleware to parse JSON bodies
app.use(express.json());

// Use the student routes for relevant endpoints
app.use('/api/students', studentRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
