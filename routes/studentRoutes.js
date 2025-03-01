// routes/studentRoutes.js
const express = require('express');
const { recordFeedbackHandler, recommendModalityHandler } = require('../controllers/studentController');

const router = express.Router();

// Record feedback route (POST)
router.post('/feedback', recordFeedbackHandler);

// Recommend modality route (POST)
router.post('/recommend', recommendModalityHandler);

module.exports = router;
