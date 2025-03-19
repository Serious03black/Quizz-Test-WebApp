import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

// Lazy load pages for performance optimization
const LandingPage = lazy(() => import('./pages/LandingPage'));
const TestPage = lazy(() => import('./pages/TestPage'));
const ResultPage = lazy(() => import('./pages/ResultPage'));
const ContactUs = lazy(() => import('./Components/ContactUs')); // Lazy load ContactUs

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const studentInfo = localStorage.getItem('studentInfo');
  return studentInfo ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/test"
              element={
                <ProtectedRoute>
                  <TestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/result"
              element={
                <ProtectedRoute>
                  <ResultPage />
                </ProtectedRoute>
              }
            />
            <Route path="/contactUs" element={<ContactUs />} /> {/* Add ContactUs route */}
    
            {/* Optional: Add a catch-all route for 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Footer */}
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;