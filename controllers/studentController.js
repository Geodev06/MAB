const { getStudent, getAverageScore, MODALITIES } = require('../models/studentModel');

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

const getStudentStatsHandler = (req, res) => {
    const { studentId } = req.body;

    if (!studentId) {
        return res.status(400).json({ error: 'studentId is required' });
    }

    const student = getStudent(studentId);

    const stats = {
        studentId,
        modalities: {},
        totalSubmissions: 0
    };

    MODALITIES.forEach(modality => {
        const scores = student.scores[modality] || [];
        stats.modalities[modality] = {
            averageScore: getAverageScore(scores),
            submissions: scores.length
        };
        stats.totalSubmissions += scores.length;
    });

    res.json(stats);
};

module.exports = {
    recordFeedbackHandler,
    recommendModalityHandler,
    getStudentStatsHandler
};
