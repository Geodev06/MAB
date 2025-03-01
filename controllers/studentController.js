// controllers/studentController.js
const { recordFeedback, recommendModalityMAB } = require('../models/studentModel');

const recordFeedbackHandler = (req, res) => {
    const { studentId, modality, score } = req.body;

    if (!studentId || !modality || score === undefined) {
        return res.status(400).json({ error: 'studentId, modality, and score are required' });
    }

    try {
        recordFeedback(studentId, modality, score);
        res.json({ message: 'Feedback recorded' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const recommendModalityHandler = (req, res) => {
    const { studentId } = req.body;

    if (!studentId) {
        return res.status(400).json({ error: 'studentId is required' });
    }

    const recommendedModality = recommendModalityMAB(studentId);
    res.json({ studentId, recommendedModality });
};

module.exports = {
    recordFeedbackHandler,
    recommendModalityHandler
};
