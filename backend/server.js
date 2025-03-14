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
app.get('/api/questions', (req, res) => {
    const sql = 'SELECT * FROM q2';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/api/submit', (req, res) => {
    const { answers } = req.body;
    const sql = 'SELECT * FROM q2';
    db.query(sql, (err, result) => {
        if (err) throw err;
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
        console.log(score);
        console.log(result);
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});