const fs = require('fs');

const MODALITIES = ['Visual', 'Auditory', 'Kinesthetic', 'Reading & Writing'];
const EPSILON = 0.1; // 10% exploration rate

const STUDENT_FILE = './data/students.json';

let students = {};

// Load students data from file (with fallback if file is empty)
const loadStudents = () => {
    try {
        if (fs.existsSync(STUDENT_FILE)) {
            const data = fs.readFileSync(STUDENT_FILE, 'utf8');
            students = data ? JSON.parse(data) : {};
        } else {
            students = {};
        }
    } catch (err) {
        console.error('Failed to load student data:', err);
        students = {};
    }
};

// Save students data to file
const saveStudents = () => {
    fs.writeFileSync(STUDENT_FILE, JSON.stringify(students, null, 2), 'utf8');
};

// Initialize students on start
loadStudents();

const getStudent = (studentId) => {
    if (!students[studentId]) {
        students[studentId] = {
            scores: MODALITIES.reduce((acc, modality) => {
                acc[modality] = [];
                return acc;
            }, {})
        };
        saveStudents();
    }
    return students[studentId];
};

// Record feedback
const recordFeedback = (studentId, modality, score) => {
    const student = getStudent(studentId);

    if (!MODALITIES.includes(modality)) {
        throw new Error(`Invalid modality: ${modality}`);
    }
    student.scores[modality].push(score);
    saveStudents();
};

// Calculate average score
const getAverageScore = (scores) => {
    if (scores.length === 0) return 0;
    return scores.reduce((a, b) => a + b, 0) / scores.length;
};

// MAB Recommendation
const recommendModalityMAB = (studentId) => {
    const student = getStudent(studentId);

    if (Math.random() < EPSILON) {
        return MODALITIES[Math.floor(Math.random() * MODALITIES.length)];
    }

    let bestModality = null;
    let bestAverageScore = -1;

    MODALITIES.forEach(modality => {
        const avgScore = getAverageScore(student.scores[modality]);
        if (avgScore > bestAverageScore) {
            bestAverageScore = avgScore;
            bestModality = modality;
        }
    });

    return bestModality || MODALITIES[Math.floor(Math.random() * MODALITIES.length)];
};

module.exports = {
    getStudent,
    recordFeedback,
    recommendModalityMAB,
    getAverageScore,  // <-- Make sure this is exported
    MODALITIES
};
