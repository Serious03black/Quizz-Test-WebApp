import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TestPage.css'; // External CSS file

const TestPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [markedForReview, setMarkedForReview] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
    const navigate = useNavigate();

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

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading questions...</p>
            </div>
        );
    }

    if (questions.length === 0) {
        return <div className="error-message">No questions available. Please try again later.</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="test-container mt-30" role="main" aria-label="Test Page">
            <header className="test-header">
                <h1 className="test-title">CSMSS MCQ Test</h1>
                <div className="timer" role="timer" aria-live="polite">
                    Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </div>
                <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
            </header>
            <div className="test-content">
                <div className="question-section">
                    <h2 className="question-number">Question {currentQuestionIndex + 1} of {questions.length}</h2>
                    <p className="question-text">{currentQuestion.question}</p>
                    <div className="options-container">
                        {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4].map((option, index) => (
                            <label key={index} className="option-label">
                                <input
                                    type="radio"
                                    name="answer"
                                    value={option}
                                    checked={answers[currentQuestionIndex] === option}
                                    onChange={() => handleAnswerChange(option)}
                                    aria-checked={answers[currentQuestionIndex] === option}
                                    tabIndex={0}
                                />
                                <span className="option-text">{option}</span>
                            </label>
                        ))}
                    </div>
                    <div className="controls">
                        <button
                            className="nav-button"
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                            aria-label="Previous Question"
                        >
                            Previous
                        </button>
                        <button
                            className="nav-button"
                            onClick={handleNextQuestion}
                            disabled={currentQuestionIndex === questions.length - 1}
                            aria-label="Next Question"
                        >
                            Next
                        </button>
                        <button
                            className="review-button"
                            onClick={handleMarkForReview}
                            aria-label={markedForReview[currentQuestionIndex] ? 'Unmark for Review' : 'Mark for Review'}
                        >
                            {markedForReview[currentQuestionIndex] ? 'Unmark' : 'Mark'} for Review
                        </button>
                        <button className="submit-button" onClick={handleSubmit} aria-label="Submit Test">
                            Submit
                        </button>
                    </div>
                </div>
                <aside className="sidebar">
                    <h3 className="sidebar-title">Questions</h3>
                    <div className="question-buttons">
                        {questions.map((_, index) => (
                            <button
                                key={index}
                                className={`question-btn ${answers[index] !== null ? 'answered' : 'unanswered'} ${
                                    markedForReview[index] ? 'marked' : ''
                                }`}
                                onClick={() => handleJumpToQuestion(index)}
                                aria-label={`Jump to Question ${index + 1}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default TestPage;