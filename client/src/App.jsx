// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
    return (
        <Router>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/test" element={<TestPage />} />
                    <Route path="/result" element={<ResultPage />} />
                </Routes>
            </ErrorBoundary>
        </Router>
    );
};
export default App;