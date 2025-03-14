// src/pages/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to the MCQ Test</h1>
            <button onClick={() => navigate('/test')}>Get Started</button>
        </div>
    );
};

export default LandingPage;