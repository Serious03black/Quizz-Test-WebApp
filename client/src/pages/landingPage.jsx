/* eslint-disable no-unused-vars */
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
    const logosRef = useRef(null);

    // Updated company logos for infinite scroll
    const companyLogos = [
        { name: "TCS", logo: "https://logo.clearbit.com/tcs.com",text:"TCS" },
        { name: "Infosys", logo: "https://logo.clearbit.com/infosys.com",text:"Infosys" },
        { name: "Wipro", logo: "https://logo.clearbit.com/wipro.com",text:"Wipro" },
        { name: "IBM", logo: "https://logo.clearbit.com/ibm.com",text:"IBM" },
        { name: "Cognizant", logo: "https://logo.clearbit.com/cognizant.com",text:"Cognizant" },
        { name: "Accenture", logo: "https://logo.clearbit.com/accenture.com",text:"Accenture" },
        { name: "Capgemini", logo: "https://logo.clearbit.com/capgemini.com",text:"Capgemini" },
    ];
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

        // Form Section Animation
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

        // Infinite Scroll for Company Logos
        if (logosRef.current) {
            const logosWidth = logosRef.current.scrollWidth / 2; // Half the width since we duplicated the logos
            gsap.to(logosRef.current, {
                x: -logosWidth,
                duration: 20, // Adjust speed of the scroll
                ease: 'none',
                repeat: -1, // Infinite loop
                modifiers: {
                    x: gsap.utils.unitize((x) => parseFloat(x) % logosWidth), // Seamless loop
                },
            });
        }
    }, []);

    const handleGetStarted = () => {
        // Scroll to the form section
        const formSection = document.querySelector('.form-section');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="landing-container mt-30 relative min-h-screen font-sans bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 overflow-hidden">
            {/* Header Section */}
            <header className="header relative z-10 text-center py-16 px-5 bg-gradient-to-b from-white to-cyan-50">
                <div className="header-content max-w-3xl mx-auto">
                    <h1 className="header-title text-4xl sm:text-5xl font-bold text-teal-900 mb-3 animate-pulse [text-shadow:_0_0_10px_#4db6ac,_0_0_20px_#4db6ac]">
                        Welcome to CET Practice Exam
                    </h1>
                    <p className="header-subtitle text-lg sm:text-xl text-gray-600 mb-8">
                        Empowering Future Innovators
                    </p>
                    {/* Get Started Button */}
                    <button
                        onClick={handleGetStarted}
                        className="get-started-btn bg-teal-600 text-white py-3 px-8 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg hover:shadow-teal-600/50"
                    >
                        Get Started For Exam
                    </button>
                </div>
            </header>

            {/* Company Logos Section */}
            <section className="company-logos-section py-12 bg-gray-50 relative z-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-teal-900">Our Top Recruiters</h2>
                </div>
                <div className="relative overflow-hidden">
                    <div ref={logosRef} className="company-logos flex gap-8">
                        {[...companyLogos, ...companyLogos].map((company, index) => (
                            <div key={index} className="flex-shrink-0 w-40 h-40 flex items-center justify-center p-4 bg-white shadow-sm rounded-lg">
                                <img
                                    src={company.logo}
                                    alt={`${company.name} logo`}
                                    className="max-h-16 max-w-full object-contain mx-auto grayscale hover:grayscale-0 transition-all duration-300"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/150?text=Logo+Not+Found";
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form and Video Section */}
            <section className="form-section container mx-auto px-4 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Form */}
                    <div className="w-full">
                        <ExamFrom />
                    </div>

                    {/* Right Column: YouTube Video */}
                    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.youtube.com/embed/6CFft1KnkHc?autoplay=1&mute=0&loop=1&playlist=6CFft1KnkHc&start=24"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube Video"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;