// server.js
const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Enable CORS for all origins
app.use(cors());  // This allows all origins by default

app.use(express.json());  // To parse JSON bodies
app.use('/students', studentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
