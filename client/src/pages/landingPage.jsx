/* eslint-disable no-unused-vars */
// src/LandingPage.jsx
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ExamFrom from '../Components/examForm';

gsap.registerPlugin(ScrollTrigger);
const LandingPage = () => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);

    // GSAP Animations
    useEffect(() => {
        // Hero Section Animation
        gsap.fromTo(
            '.header-content',
            { opacity: 0, y: 200, scale: 0.7 },
            { opacity: 1, y: 0, scale: 1, duration: 2.5, ease: "power4.out", stagger: 0.4 }
        );

        // Get Started Button Animation
        gsap.fromTo(
            '.get-started-btn',
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 1 }
        );

        // Form Section Animation (for when the form is shown)
        gsap.fromTo(
            '.form-section',
            { opacity: 0, y: 150 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "back.out(2)",
                scrollTrigger: {
                    trigger: '.form-section',
                    start: "top 70%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);

    return (
        <div className="landing-container relative min-h-screen font-sans bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 overflow-hidden">
            {/* Header Section */}
            <header className="header relative z-10 mt-30 text-center py-16 px-5 bg-gradient-to-b from-white to-cyan-50">
                <div className="header-content max-w-3xl mx-auto">
                    <h1 className="header-title text-4xl sm:text-5xl font-bold text-teal-900 mb-3 animate-pulse [text-shadow:_0_0_10px_#4db6ac,_0_0_20px_#4db6ac]">
                        Welcome to CET Pratice Exam 
                    </h1>
                    <p className="header-subtitle text-lg sm:text-xl text-gray-600 mb-8">
                        Empowering Future Innovators
                    </p>
                    {/* Get Started Button */}
                </div>
            </header>

            {/* Form Section */}
            <ExamFrom />
        </div>
    );
};

export default LandingPage;