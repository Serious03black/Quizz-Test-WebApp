import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

// Lazy load pages for performance optimization
const LandingPage = lazy(() => import('./pages/LandingPage'));
const TestPage = lazy(() => import('./pages/TestPage'));
const ResultPage = lazy(() => import('./pages/ResultPage'));
const ContactUs = lazy(() => import('./Components/ContactUs')); // Lazy load ContactUs
import AdminPage from './Components/Adminpage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const studentInfo = localStorage.getItem('studentInfo');
  return studentInfo ? children : <Navigate to="VITE_API_BASE_URL" replace />;
};

const App = () => {
  return (
    <Router>
        <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
          {/* Navbar */}
          <Navbar />
          {/* Main Content */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/test"
              element={
                  <TestPage />
              }
            />
            <Route
              path="/resultPage"
              element={
                  <ResultPage />
              }
            />
            <Route 
            path="/AdminPage" 
            element={
              <AdminPage/>
              
            }/>

            <Route path="/contactUs" element={<ContactUs />} /> {/* Add ContactUs route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {/* Footer */}
          <Footer />
        </Suspense>
    </Router>
  );
};

export default App;