import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TestPage = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [markedForReview, setMarkedForReview] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
    const [showTools, setShowTools] = useState(false);
    const [calcInput, setCalcInput] = useState('');
    const [calcResult, setCalcResult] = useState('');
    const [notes, setNotes] = useState(localStorage.getItem('examNotes') || '');
    const [showFormulaSheet, setShowFormulaSheet] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get('http://localhost:5000/api/questions')
            .then((response) => {
                setQuestions(response.data);
                setAnswers(new Array(response.data.length).fill(null));
                setMarkedForReview(new Array(response.data.length).fill(false));
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching questions:', error);
                setIsLoading(false);
            });

        // Timer setup
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit(); // Auto-submit when time runs out
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup timer on unmount
    }, []);

    const handleAnswerChange = (answer) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = answer;
        setAnswers(newAnswers);
    };

    const handleMarkForReview = () => {
        const newMarkedForReview = [...markedForReview];
        newMarkedForReview[currentQuestionIndex] = !newMarkedForReview[currentQuestionIndex];
        setMarkedForReview(newMarkedForReview);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleJumpToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const handleSubmit = () => {
        axios
            .post('http://localhost:5000/api/submit', { answers })
            .then((response) => {
                navigate('/result', { state: { results: response.data } });
            })
            .catch((error) => console.error('Error submitting answers:', error));
    };

    // Calculator Functions
    const handleCalcInput = (value) => {
        setCalcInput((prev) => prev + value);
    };

    const handleCalcClear = () => {
        setCalcInput('');
        setCalcResult('');
    };

    const handleCalcEvaluate = () => {
        try {
            const result = eval(calcInput); // Use eval for simplicity; consider a safer alternative in production
            setCalcResult(result.toString());
        } catch (error) {
            setCalcResult('Error');
        }
    };

    // Notepad Functions
    const handleNotesChange = (e) => {
        const newNotes = e.target.value;
        setNotes(newNotes);
        localStorage.setItem('examNotes', newNotes); // Save notes to localStorage
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-600"></div>
                <p className="ml-4 text-lg text-gray-700">Loading questions...</p>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-xl text-red-600">No questions available. Please try again later.</p>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="test-container mt-50 min-h-screen bg-gray-100 font-sans text-gray-800" role="main" aria-label="Test Page">
            {/* Header */}
            <header className="test-header bg-teal-700 text-white py-6 px-4 shadow-lg">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold">CSMSS MCQ Test</h1>
                    <div className="flex items-center space-x-4">
                        <div className="timer text-lg font-semibold" role="timer" aria-live="polite">
                            Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                        </div>
                        <button
                            onClick={() => setShowTools(!showTools)}
                            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg transition-all duration-300"
                            aria-label={showTools ? "Hide Tools" : "Show Tools"}
                        >
                            {showTools ? 'Hide Tools' : 'Show Tools'}
                        </button>
                    </div>
                </div>
                <div className="progress-bar mt-4 max-w-7xl mx-auto" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </header>

            {/* Main Content */}
            <div className="test-content max-w-7xl mx-auto py-8 px-4 flex flex-col md:flex-row gap-6">
                {/* Question Section */}
                <div className="question-section flex-1 bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-teal-800 mb-4">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </h2>
                    <p className="text-lg text-gray-800 mb-6">{currentQuestion.question}</p>
                    <div className="options-container space-y-4">
                        {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4].map((option, index) => (
                            <label key={index} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="answer"
                                    value={option}
                                    checked={answers[currentQuestionIndex] === option}
                                    onChange={() => handleAnswerChange(option)}
                                    className="form-radio h-5 w-5 text-teal-600 focus:ring-teal-500"
                                    aria-checked={answers[currentQuestionIndex] === option}
                                    tabIndex={0}
                                />
                                <span className="text-gray-700">{option}</span>
                            </label>
                        ))}
                    </div>
                    <div className="controls mt-8 flex flex-wrap gap-4">
                        <button
                            className={`bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all duration-300 ${
                                currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                            aria-label="Previous Question"
                        >
                            Previous
                        </button>
                        <button
                            className={`bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all duration-300 ${
                                currentQuestionIndex === questions.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            onClick={handleNextQuestion}
                            disabled={currentQuestionIndex === questions.length - 1}
                            aria-label="Next Question"
                        >
                            Next
                        </button>
                        <button
                            className={`py-2 px-4 rounded-lg transition-all duration-300 ${
                                markedForReview[currentQuestionIndex]
                                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            }`}
                            onClick={handleMarkForReview}
                            aria-label={markedForReview[currentQuestionIndex] ? 'Unmark for Review' : 'Mark for Review'}
                        >
                            {markedForReview[currentQuestionIndex] ? 'Unmark' : 'Mark'} for Review
                        </button>
                        <button
                            className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-all duration-300"
                            onClick={handleSubmit}
                            aria-label="Submit Test"
                        >
                            Submit
                        </button>
                    </div>
                </div>

                {/* Sidebar and Tools Section */}
                <aside className="sidebar w-full md:w-80 flex flex-col gap-6">
                    {/* Question Navigation */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-teal-800 mb-4">Questions</h3>
                        <div className="grid grid-cols-5 gap-2">
                            {questions.map((_, index) => (
                                <button
                                    key={index}
                                    className={`p-2 rounded-lg text-center transition-all duration-300 ${
                                        answers[index] !== null
                                            ? 'bg-teal-100 text-teal-800'
                                            : 'bg-gray-100 text-gray-600'
                                    } ${markedForReview[index] ? 'border-2 border-yellow-500' : ''} ${
                                        currentQuestionIndex === index ? 'ring-2 ring-teal-500' : ''
                                    } hover:bg-teal-200`}
                                    onClick={() => handleJumpToQuestion(index)}
                                    aria-label={`Jump to Question ${index + 1}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tools Section (Toggleable) */}
                    {showTools && (
                        <div className="tools-section bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-teal-800 mb-4">Tools</h3>
                            <div className="space-y-6">
                                {/* Calculator */}
                                <div>
                                    <h4 className="text-md font-medium text-gray-700 mb-2">Calculator</h4>
                                    <div className="bg-gray-100 p-4 rounded-lg">
                                        <div className="mb-2">
                                            <input
                                                type="text"
                                                value={calcInput}
                                                onChange={(e) => setCalcInput(e.target.value)}
                                                className="w-full p-2 rounded-lg border border-gray-300 text-right text-gray-800"
                                                placeholder="Enter expression"
                                                readOnly
                                            />
                                            <div className="text-right text-gray-600 mt-1">
                                                Result: {calcResult}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-2">
                                            {['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', '0', '.', '=', '/'].map(
                                                (btn, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() =>
                                                            btn === '=' ? handleCalcEvaluate() : handleCalcInput(btn)
                                                        }
                                                        className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600 transition-all duration-300"
                                                    >
                                                        {btn}
                                                    </button>
                                                )
                                            )}
                                            <button
                                                onClick={handleCalcClear}
                                                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all duration-300 col-span-4"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Notepad */}
                                <div>
                                    <h4 className="text-md font-medium text-gray-700 mb-2">Notepad</h4>
                                    <textarea
                                        value={notes}
                                        onChange={handleNotesChange}
                                        className="w-full h-32 p-3 rounded-lg border border-gray-300 text-gray-800 resize-none"
                                        placeholder="Jot down your notes here..."
                                    />
                                </div>

                                {/* Formula Sheet */}
                                <div>
                                    <button
                                        onClick={() => setShowFormulaSheet(true)}
                                        className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition-all duration-300"
                                    >
                                        View Formula Sheet
                                    </button>
                                    {showFormulaSheet && (
                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                            <div className="bg-white rounded-xl p-6 max-w-lg w-full">
                                                <h4 className="text-lg font-semibold text-teal-800 mb-4">Formula Sheet</h4>
                                                <ul className="list-disc pl-5 text-gray-700">
                                                    <li>Area of Circle: πr²</li>
                                                    <li>Pythagorean Theorem: a² + b² = c²</li>
                                                    <li>Quadratic Formula: x = (-b ± √(b² - 4ac)) / 2a</li>
                                                    {/* Add more formulas as needed */}
                                                </ul>
                                                <button
                                                    onClick={() => setShowFormulaSheet(false)}
                                                    className="mt-4 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-all duration-300"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Periodic Table (Placeholder) */}
                                <div>
                                    <a
                                        href="https://www.ptable.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full block bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition-all duration-300 text-center"
                                    >
                                        View Periodic Table
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default TestPage;