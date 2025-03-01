// server.js
const express = require('express');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

app.use(express.json());  // To parse JSON bodies
app.use('/students', studentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
