// routes/studentRoutes.js
const express = require('express');
const { 
    recordFeedbackHandler, 
    recommendModalityHandler, 
    getStudentStatsHandler 
} = require('../controllers/studentController');

const router = express.Router();

// Record feedback (POST)
router.post('/feedback', recordFeedbackHandler);

// Recommend modality (POST)
router.post('/recommend', recommendModalityHandler);

// Get student stats (POST)
router.post('/stats', getStudentStatsHandler);

module.exports = router;
