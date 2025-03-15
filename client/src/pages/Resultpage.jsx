import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    console.log('Location State:', location.state); // Debugging
    console.log('Results:', location.state?.results); // Debugging

    // Fallback if location.state is undefined
    if (!location.state) {
        return (
            <div>
                <h1>No results found</h1>
                <button onClick={() => navigate('/')}>Go back to Home</button>
            </div>
        );
    }

    const { score, results } = location.state;

    // Ensure results is an array
    if (!Array.isArray(results)) {
        console.error('Results is not an array:', results); // Debugging
        return (
            <div>
                <h1>Invalid results data</h1>
                <button onClick={() => navigate('/')}>Go back to Home</button>
            </div>
        );
    }

    return (
        <div style={styles.container} className="">
            <h1>Congratulations!</h1>
            <h2>Your Score: {score}/{results.length}</h2>
            <div style={styles.results}>
                {results.map((result, index) => {
                    // Ensure result is an object and has the required properties
                    if (!result || typeof result !== 'object') {
                        console.error('Invalid result at index:', index, result); // Debugging
                        return null; // Skip invalid results
                    }

                    return (
                        <div key={index} style={styles.resultItem}>
                            <p><strong>Question {index + 1}:</strong> {result.question || 'No question text'}</p>
                            <p>Your Answer: {result.userAnswer || 'Not answered'} {result.isCorrect ? '✅' : '❌'}</p>
                            <p>Correct Answer: {result.correct_answer || 'No correct answer'}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ResultPage;

// Inline styles for the component
const styles = {
    container: {
        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    results: {
        marginTop: '200px',
    },
    resultItem: {
        marginBottom: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
};