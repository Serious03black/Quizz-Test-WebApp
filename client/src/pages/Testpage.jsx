// src/pages/TestPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TestPage = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/questions')
            .then(response => setQuestions(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = () => {
        axios.post('http://localhost:5000/api/submit', { answers })
            .then(response => {
                const results = response.data?.results || response.data || [];
                const score = results.filter(result => result.isCorrect).length;
                navigate('/result', { state: { results, score } });
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>MCQ Test</h1>
            {questions.map((question, index) => (
                <div key={question.id}>
                    <p>{question.question}</p>
                    {[question.option1, question.option2, question.option3, question.option4].map((option, i) => (
                        <label key={`q${question.id}-o${i}`}>
                            <input
                                type="radio"
                                name={`question-${index}`}
                                value={option}
                                checked={answers[index] === option}
                                onChange={() => {
                                    const newAnswers = [...answers];
                                    newAnswers[index] = option;
                                    setAnswers(newAnswers);
                                }}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default TestPage;
