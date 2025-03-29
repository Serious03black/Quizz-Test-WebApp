const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tiger",
  database: "mcqApp",
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected');
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage }).fields([
  { name: 'file', maxCount: 1 }, // For Excel file
  { name: 'question_image', maxCount: 1 },
  { name: 'option1_image', maxCount: 1 },
  { name: 'option2_image', maxCount: 1 },
  { name: 'option3_image', maxCount: 1 },
  { name: 'option4_image', maxCount: 1 },
]);

// Fetch all students
app.get('/api/students', (req, res) => {
  const sql = 'SELECT * FROM students';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Upload questions from Excel
app.post('/api/upload-questions', upload, (req, res) => {
  const files = req.files || {};
  const file = files['file'] ? files['file'][0] : null;

  if (!file) {
    return res.status(400).send('No Excel file uploaded.');
  }

  const filePath = path.join(__dirname, 'uploads', file.filename);
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const sql = `
    INSERT INTO q2 (question, option1, option2, option3, option4, answer, question_image, option1_image, option2_image, option3_image, option4_image)
    VALUES ?
    ON DUPLICATE KEY UPDATE
      option1 = VALUES(option1),
      option2 = VALUES(option2),
      option3 = VALUES(option3),
      option4 = VALUES(option4),
      answer = VALUES(answer),
      question_image = VALUES(question_image),
      option1_image = VALUES(option1_image),
      option2_image = VALUES(option2_image),
      option3_image = VALUES(option3_image),
      option4_image = VALUES(option4_image)
  `;

  const values = data.map((row) => [
    row.question,
    row.option1,
    row.option2,
    row.option3,
    row.option4,
    row.answer,
    files['question_image'] ? `/uploads/${files['question_image'][0].filename}` : null,
    files['option1_image'] ? `/uploads/${files['option1_image'][0].filename}` : null,
    files['option2_image'] ? `/uploads/${files['option2_image'][0].filename}` : null,
    files['option3_image'] ? `/uploads/${files['option3_image'][0].filename}` : null,
    files['option4_image'] ? `/uploads/${files['option4_image'][0].filename}` : null,
  ]);

  db.query(sql, [values], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Questions uploaded successfully');
  });
});

// Fetch all questions
app.get('/api/questions', (req, res) => {
  const sql = 'SELECT * FROM q2';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Edit a question
app.put('/api/questions/:id', upload, (req, res) => {
  const { id } = req.params;
  const { question, option1, option2, option3, option4, answer } = req.body;
  const files = req.files || {};

  const sql = `
    UPDATE q2
    SET question = ?, option1 = ?, option2 = ?, option3 = ?, option4 = ?, answer = ?,
        question_image = ?, option1_image = ?, option2_image = ?, option3_image = ?, option4_image = ?
    WHERE id = ?
  `;

  const values = [
    question,
    option1,
    option2,
    option3,
    option4,
    answer,
    files['question_image'] ? `/uploads/${files['question_image'][0].filename}` : req.body.question_image,
    files['option1_image'] ? `/uploads/${files['option1_image'][0].filename}` : req.body.option1_image,
    files['option2_image'] ? `/uploads/${files['option2_image'][0].filename}` : req.body.option2_image,
    files['option3_image'] ? `/uploads/${files['option3_image'][0].filename}` : req.body.option3_image,
    files['option4_image'] ? `/uploads/${files['option4_image'][0].filename}` : req.body.option4_image,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Question updated successfully');
  });
});

// Delete a question
app.delete('/api/questions/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM q2 WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Question deleted successfully');
  });
});

app.delete('/api/questions', (req, res) => {
  const sql = 'TRUNCATE TABLE q2';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Questions deleted successfully');
  });
});

// Add a student manually
app.post('/api/students', (req, res) => {
  const { name, college, domain, address, contactNumber, IntrestedOrNot } = req.body;

  if (!name || !college || !domain || !contactNumber) {
    return res.status(400).send('Missing required fields: name, college, domain, and contactNumber are required');
  }

  const sql = `
    INSERT INTO students (name, college, Domain, address, contactNumber, IntrestedOrNot, EntryTime, marks)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    college,
    domain,
    address || null,
    contactNumber,
    IntrestedOrNot || 'ND',
    new Date().toISOString().slice(0, 19).replace('T', ' '),
    'Not Appeared', // Default value for marks
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding student:', err);
      return res.status(500).send(`Database error: ${err.message}`);
    }
    res.status(201).send('Student added successfully');
  });
});

// Submit test results and update student marks
app.post('/api/submit', (req, res) => {
  const { name, answers } = req.body;

  if (!name || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Name and answers array are required and must be valid' });
  }

  // Fetch questions to calculate score
  const fetchQuestionsSql = 'SELECT * FROM q2';
  db.query(fetchQuestionsSql, (err, questions) => {
    if (err) {
      console.error('Error fetching questions:', err);
      return res.status(500).send(`Database error: ${err.message}`);
    }

    if (answers.length !== questions.length) {
      return res.status(400).json({ error: 'Answers array length does not match the number of questions' });
    }

    let score = 0;
    const results = questions.map((question, index) => {
      const isCorrect = question.answer === answers[index];
      if (isCorrect) score++;
      return {
        ...question,
        userAnswer: answers[index],
        isCorrect,
      };
    });

    // Update student's marks in the students table
    const updateMarksSql = 'UPDATE students SET marks = ? WHERE name = ?';
    const totalQuestions = questions.length;
    const marksValue = `${score}/${totalQuestions}`; // e.g., "8/10"

    db.query(updateMarksSql, [marksValue, name], (err, updateResult) => {
      if (err) {
        console.error('Error updating student marks:', err);
        return res.status(500).send(`Database error: ${err.message}`);
      }
      if (updateResult.affectedRows === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }

      // Optionally save to test_results table
      const insertResultSql = `
        INSERT INTO test_results (student_id, score, submission_time)
        SELECT id, ?, ? FROM students WHERE name = ?
      `;
      const resultValues = [
        score,
        new Date().toISOString().slice(0, 19).replace('T', ' '),
        name,
      ];

      db.query(insertResultSql, resultValues, (err) => {
        if (err) {
          console.error('Error saving test result:', err);
          return res.status(500).send(`Database error: ${err.message}`);
        }
        res.json({ score, results });
      });
    });
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app