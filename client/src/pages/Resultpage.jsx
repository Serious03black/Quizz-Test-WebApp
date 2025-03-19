import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { results } = location.state || {};

    if (!results) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-xl text-red-600">No results found. Please take the test first.</p>
            </div>
        );
    }
    const { score, results: questionResults } = results;
    return (
        <div className="result-container min-h-screen mt-10 bg-gray-100 font-sans text-gray-800 p-8" role="main" aria-label="Result Page">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                {/* Result Header */}
                <h1 className="text-4xl font-bold text-teal-800 mb-6 text-center">Test Results</h1>
                <div className="text-center mb-8">
                    <p className="text-2xl font-semibold text-gray-700">
                        Congratulations! You scored <span className="text-teal-600">{score}</span> out of{' '}
                        <span className="text-teal-600">{questionResults.length}</span>.
                    </p>
                </div>
                {/* Breakdown of Results */}
                <div className="results-breakdown mb-8">
                    <h2 className="text-2xl font-bold text-teal-800 mb-4">Detailed Breakdown</h2>
                    <div className="space-y-4">
                        {questionResults.map((question, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-lg ${
                                    question.isCorrect ? 'bg-green-50' : 'bg-red-50'
                                }`}
                            >
                                <p className="text-lg font-semibold text-gray-800">
                                    Question {index + 1}: {question.question}
                                </p>
                                <p className="text-gray-700">
                                    Your Answer: <span className="font-semibold">{question.userAnswer || 'Not answered'}</span>
                                </p>
                                {!question.isCorrect && (
                                    <p className="text-gray-700">
                                        Correct Answer: <span className="font-semibold text-green-600">{question.answer}</span>
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Navigation Buttons */}
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition-all duration-300"
                    >
                        Back to Home
                    </button>
                    <button
                        onClick={() => navigate('/test')}
                        className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition-all duration-300"
                    >
                        Retake Test
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;