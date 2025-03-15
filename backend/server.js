const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tiger',
    database: 'mcqapp'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected');
});

// Routes

// Fetch all questions
app.get('/api/questions', (req, res) => {
    const sql = 'SELECT * FROM q2';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Submit answers and calculate score
app.post('/api/submit', (req, res) => {
    const { answers } = req.body;
    if (!answers || !Array.isArray(answers)) {
        return res.status(400).json({ error: 'Answers array is missing or invalid' });
    }
    const sql = 'SELECT * FROM q2';
    db.query(sql, (err, result) => {
        if (err) throw err;
        if (answers.length !== result.length) {
            return res.status(400).json({ error: 'Answers array length does not match the number of questions' });
        }
        let score = 0;
        const results = result.map((question, index) => {
            const isCorrect = question.correct_answer === answers[index];
            if (isCorrect) score++;
            return {
                ...question,
                userAnswer: answers[index],
                isCorrect
            };
        });
        res.json({ score, results });
    });
});

// Save student information
app.post('/api/student', (req, res) => {
    const { name, address, college, domain, contactNumber,IntrestedOrNot } = req.body;

    // Insert student info into the database
    const sql = 'INSERT INTO students (name, address, college, domain, contactNumber,IntrestedOrNot) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, address, college, domain, contactNumber,IntrestedOrNot], (err, result) => {
        if (err) {
            console.error('Error inserting student data:', err);
            return res.status(500).json({ error: 'Failed to save student data' });
        }
        res.json({ message: 'Student data saved successfully', id: result.name });
    });
});
// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
