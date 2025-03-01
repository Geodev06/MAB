const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'students.json');

const MODALITIES = ['Visual', 'Auditory', 'Kinesthetic', 'Reading & Writing'];
const EPSILON = 0.1; // 10% exploration rate

// In-memory cache (loaded from file at startup)
let students = loadStudents();

// Load students from JSON file
function loadStudents() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE);
            return JSON.parse(data);
        }
    } catch (err) {
        console.error('Failed to load student data:', err);
    }
    return {}; // Return empty if file does not exist or fails
}

// Save students to JSON file
function saveStudents() {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2));
    } catch (err) {
        console.error('Failed to save student data:', err);
    }
}

// Get or initialize a student
const getStudent = (studentId) => {
    if (!students[studentId]) {
        students[studentId] = {
            scores: MODALITIES.reduce((acc, modality) => {
                acc[modality] = [];
                return acc;
            }, {})
        };
    }
    return students[studentId];
};

// Record feedback and save to file
const recordFeedback = (studentId, modality, score) => {
    const student = getStudent(studentId);

    if (!MODALITIES.includes(modality)) {
        throw new Error(`Invalid modality: ${modality}`);
    }

    student.scores[modality].push(score);

    // Persist data after updating
    saveStudents();
};

// Calculate average score for a modality
const getAverageScore = (scores) => {
    if (scores.length === 0) return 0;
    return scores.reduce((a, b) => a + b, 0) / scores.length;
};

// Recommend a modality using ε-greedy MAB
const recommendModalityMAB = (studentId) => {
    const student = getStudent(studentId);

    // Exploration (choose random modality with probability ε)
    if (Math.random() < EPSILON) {
        return MODALITIES[Math.floor(Math.random() * MODALITIES.length)];
    }

    // Exploitation (choose the best modality based on average score)
    let bestModality = null;
    let bestAverageScore = -1;

    MODALITIES.forEach(modality => {
        const avgScore = getAverageScore(student.scores[modality]);
        if (avgScore > bestAverageScore) {
            bestAverageScore = avgScore;
            bestModality = modality;
        }
    });

    // If all modalities have no scores, pick one randomly
    if (!bestModality) {
        bestModality = MODALITIES[Math.floor(Math.random() * MODALITIES.length)];
    }

    return bestModality;
};

module.exports = {
    getStudent,
    recordFeedback,
    recommendModalityMAB,
    MODALITIES
};
