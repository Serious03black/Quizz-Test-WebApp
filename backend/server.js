const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// MongoDB connection
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define Schemas
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: { type: String, required: true },
  domain: { type: String, required: true },
  address: { type: String },
  contactNumber: { type: String, required: true },
  interestedOrNot: { type: String, default: 'ND' },
  entryTime: { type: Date, default: Date.now },
  marks: { type: String, default: 'Not Appeared' },
});

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  option3: { type: String, required: true },
  option4: { type: String, required: true },
  answer: { type: String, required: true },
});

const testResultSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  score: { type: Number, required: true },
  submissionTime: { type: Date, default: Date.now },
});

// Create Models
const Student = mongoose.model('Student', studentSchema);
const Question = mongoose.model('Question', questionSchema);
const TestResult = mongoose.model('TestResult', testResultSchema);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Fetch all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).send(err.message);
  }
});

// Upload questions from Excel
app.post('/api/upload-questions', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  try {
    await Question.deleteMany({}); // Clear existing questions (optional)
    const questions = data.map((row) => ({
      question: row.question,
      option1: row.option1,
      option2: row.option2,
      option3: row.option3,
      option4: row.option4,
      answer: row.answer,
    }));
    await Question.insertMany(questions);
    res.send('Questions uploaded successfully');
  } catch (err) {
    console.error('Error uploading questions:', err);
    res.status(500).send(err.message);
  }
});

// Fetch all questions
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).send(err.message);
  }
});

// Edit a question
app.put('/api/questions/:id', async (req, res) => {
  const { id } = req.params;
  const { question, option1, option2, option3, option4, answer } = req.body;

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { question, option1, option2, option3, option4, answer },
      { new: true }
    );
    if (!updatedQuestion) return res.status(404).send('Question not found');
    res.send('Question updated successfully');
  } catch (err) {
    console.error('Error updating question:', err);
    res.status(500).send(err.message);
  }
});

// Delete a question
app.delete('/api/questions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Question.findByIdAndDelete(id);
    if (!result) return res.status(404).send('Question not found');
    res.send('Question deleted successfully');
  } catch (err) {
    console.error('Error deleting question:', err);
    res.status(500).send(err.message);
  }
});

// Delete all questions
app.delete('/api/questions', async (req, res) => {
  try {
    await Question.deleteMany({});
    res.send('Questions deleted successfully');
  } catch (err) {
    console.error('Error deleting all questions:', err);
    res.status(500).send(err.message);
  }
});

// Add a student manually
app.post('/api/students', async (req, res) => {
  const { name, college, domain, address, contactNumber, interestedOrNot } = req.body;

  if (!name || !college || !domain || !contactNumber) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const student = new Student({
      name,
      college,
      domain,
      address,
      contactNumber,
      interestedOrNot: interestedOrNot || 'ND',
    });
    await student.save();
    res.status(201).send('Student added successfully');
  } catch (err) {
    console.error('Error adding student:', err);
    res.status(500).send(err.message);
  }
});

// Submit test results and update student marks
app.post('/api/submit', async (req, res) => {
  const { name, answers } = req.body;

  if (!name || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Name and answers array are required and must be valid' });
  }

  try {
    const questions = await Question.find();
    if (answers.length !== questions.length) {
      return res.status(400).json({ error: 'Answers array length does not match the number of questions' });
    }

    let score = 0;
    const results = questions.map((question, index) => {
      const isCorrect = question.answer === answers[index];
      if (isCorrect) score++;
      return {
        ...question.toObject(),
        userAnswer: answers[index],
        isCorrect,
      };
    });

    const student = await Student.findOneAndUpdate(
      { name },
      { marks: `${score}/${questions.length}` },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const testResult = new TestResult({
      studentId: student._id,
      score,
    });
    await testResult.save();

    res.json({ score, results });
  } catch (err) {
    console.error('Error submitting test results:', err);
    res.status(500).send(err.message);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});