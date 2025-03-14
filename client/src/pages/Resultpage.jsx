// src/pages/ResultPage.js
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
    const location = useLocation();
    const { results = [] } = location.state || {};

    // Compute score and correctness manually
    const enhancedResults = useMemo(() => {
        return results.map(result => ({
            ...result,
            isCorrect: result.userAnswer === result.answer
        }));
    }, [results]);

    const score = enhancedResults.filter(r => r.isCorrect).length;

    return (
        <div>
            <h1>Your Score: {score}/{enhancedResults.length}</h1>
            {enhancedResults.map((result, index) => (
                <div key={index}>
                    <p><strong>Q:</strong> {result.question}</p>
                    <p><strong>Your Answer:</strong> {result.userAnswer} {result.isCorrect ? '✅' : '❌'}</p>
                    <p><strong>Correct Answer:</strong> {result.answer}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default ResultPage;
