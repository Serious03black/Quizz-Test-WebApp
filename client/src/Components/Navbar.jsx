import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import csmssLogo from '../assets/csmssengg.jpg'; // Left logo
import l1Logo from '../assets/l1.jpg'; // Right logo
import './Nav.css'; // For custom CSS animations and glassmorphism

const Navigation = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleNavigation = (path) => {
        // Check if the path is an external URL (starts with http or https)
        if (path.startsWith('http') || path.startsWith('https')) {
            window.open(path, '_blank', 'noopener,noreferrer'); // Open in a new tab
        } else {
            navigate(path); // Use react-router-dom for internal navigation
        }

        if (isSidebarOpen) toggleSidebar();
    };

    // Navigation links for both desktop and mobile
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Website', path: "https://www.csmssengg.org/" },
        { name: 'Placement', path: '/placement' },
        { name: 'Contact Us', path: '/contactUs' },
    ];

    return (
        <>
            {/* Navigation Bar */}
            <nav className="fixed top-0 h-35 left-0 right-0 bg-white shadow-lg z-50 border-b-4 border-green-500/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
                    {/* Navigation Content */}
                    <div className="flex items-center h-20">
                        {/* Left Logo (CSMSS Logo) */}
                        <button
                            className="flex items-center hover:scale-110 transition-transform"
                            onClick={() => handleNavigation('/')}
                            aria-label="Go to Home"
                        >
                            <img src={csmssLogo} alt="CSMSS Logo" className="h-30 w-auto mt-10" />
                        </button>

                        {/* College Name and Affiliation (Centered) */}
                        <div className="flex-1 mt-6 flex justify-center items-center text-center px-4">
                            <div>
                                <h1 className="sm:text-3xl font-bold text-red-700">
                                    CSMSS Chh. Shahu College of Engineering
                                </h1>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Approved by AICTE-New Delhi, DTE-Govt. of Maharashtra,
                                    <br /> Affiliated to Dr. Babasaheb Ambedkar Technological University, Lonere
                                </p>
                            </div>
                        </div>

                        {/* Right Logo (l1 Logo) */}
                        <img src={l1Logo} alt="L1 Logo" className="h-30 mt-10 w-auto" />
                    </div>

                    {/* Navigation Links (Desktop) */}
                    <div className="hidden md:flex items-center justify-center space-x-4 py-2">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                className="glassmorphism-button text-base mt-6 font-medium text-gray-700 transition-all"
                                onClick={() => handleNavigation(link.path)}
                                aria-label={`Go to ${link.name}`}
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;