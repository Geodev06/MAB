const express = require('express');
const cors = require('cors'); // Importing the CORS middleware
const studentRoutes = require('./routes/studentRoutes'); // Import your routes

const app = express();

// Enable CORS for all routes and allow requests from http://127.0.0.1:8000
app.use(cors({
  origin: '*', // Allow only this specific origin
  methods: 'GET,POST',  // You can also restrict to certain HTTP methods
  allowedHeaders: 'Content-Type, Authorization', // Allow headers that are necessary
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Use the student routes for relevant endpoints
app.use('/students', studentRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
