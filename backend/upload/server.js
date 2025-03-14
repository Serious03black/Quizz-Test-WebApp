const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const xlsx = require('xlsx');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tiger',
  database: 'mcqApp'
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
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Upload Excel file and insert data into MySQL
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const sql = 'INSERT INTO questions (question, option1, option2, option3, option4, answer) VALUES ?';
  const values = data.map(row => [
    row.question,
    row.option1,
    row.option2,
    row.option3,
    row.option4,
    row.answer
  ]);

  db.query(sql, [values], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Excel file uploaded and data inserted into MySQL');
  });
});

// Fetch questions from the database
app.get('/questions', (req, res) => {
  const sql = 'SELECT * FROM questions';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Calculate marks
app.post('/submit', (req, res) => {
  const { answers } = req.body;
  const sql = 'SELECT id, answer FROM questions';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);

    let score = 0;
    result.forEach((question) => {
      if (answers[question.id] === question.answer) {
        score++;
      }
    });

    res.json({ score });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});