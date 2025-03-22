/* eslint-disable no-unused-vars */
// src/components/MCQForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const MCQForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        college: '',
        domain: '',
        contactNumber: '',
        IntrestedOrNot: ''
    });
    const [showConfetti, setShowConfetti] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/students', formData);
            console.log('Student data saved:', response.data);
            
            localStorage.setItem('studentInfo', JSON.stringify(formData));
            setShowConfetti(true); // Show confetti (though Confetti is commented out in the original code)
            setTimeout(() => {
                setShowConfetti(false);
                navigate('/test');
            }, 3000); // Navigate after 3 seconds
        } catch (error) {
            console.error('Error saving student data:', error);
            alert('Failed to save student data. Please try again.');
        }
    };

    return (
        <section className="form-section relative z-10 py-10 px-5 bg-gradient-to-br from-teal-50 to-white max-w-3xl mx-auto my-5 rounded-xl shadow-2xl">
            <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-teal-800 mb-5">
                    Take the MCQ Test to Shape Your Future at CSMSS
                </h2>
                <p className="text-lg sm:text-xl text-gray-700 mb-8">
                    Complete this form to unlock your engineering journey with us!
                </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-teal-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="peer w-full px-4 py-3 bg-white border-2 border-teal-300 text-teal-900 placeholder-transparent focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 rounded-lg"
                            placeholder="Full Name"
                            required
                        />
                        <label
                            className="absolute left-4 top-0 text-teal-600 text-sm transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-teal-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-teal-600"
                        >
                            Full Name
                        </label>
                    </div>

                    {/* Address */}
                    <div className="relative">
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="peer w-full px-4 py-3 bg-white border-2 border-teal-300 text-teal-900 placeholder-transparent focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 rounded-lg"
                            placeholder="Address"
                            required
                        />
                        <label
                            className="absolute left-4 top-0 text-teal-600 text-sm transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-teal-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-teal-600"
                        >
                            Address
                        </label>
                    </div>

                    {/* 12th College Name */}
                    <div className="relative">
                        <input
                            type="text"
                            name="college"
                            value={formData.college}
                            onChange={handleChange}
                            className="peer w-full px-4 py-3 bg-white border-2 border-teal-300 text-teal-900 placeholder-transparent focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 rounded-lg"
                            placeholder="12th College Name"
                            required
                        />
                        <label
                            className="absolute left-4 top-0 text-teal-600 text-sm transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-teal-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-teal-600"
                        >
                            12th College Name
                        </label>
                    </div>

                    {/* Interested Domain */}
                    <div className="relative">
                        <select
                            name="domain"
                            value={formData.domain}
                            onChange={handleChange}
                            className="peer w-full px-4 py-3 bg-white border-2 border-teal-300 text-teal-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 rounded-lg appearance-none"
                            required
                        >
                            <option value="" className="text-gray-600">Select Domain</option>
                            <option value="CSE" className="text-gray-600">Computer Science Engineering (CSE)</option>
                            <option value="Civil" className="text-gray-600">Civil Engineering</option>
                            <option value="Mechanical" className="text-gray-600">Mechanical Engineering</option>
                            <option value="Electrical" className="text-gray-600">Electrical Engineering</option>
                            <option value="Other" className="text-gray-600">Other</option>
                        </select>
                        <label
                            className="absolute left-4 top-0 text-teal-600 text-sm transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-teal-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-teal-600"
                        >
                            Interested Domain
                        </label>
                        <svg
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {/* Contact Number */}
                    <div className="relative">
                        <input
                            type="tel"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            className="peer w-full px-4 py-3 bg-white border-2 border-teal-300 text-teal-900 placeholder-transparent focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 rounded-lg"
                            placeholder="Contact Number"
                            required
                        />
                        <label
                            className="absolute left-4 top-0 text-teal-600 text-sm transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-teal-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-teal-600"
                        >
                            Contact Number
                        </label>
                    </div>

                    {/* Interested in Admission? */}
                    <div className="relative">
                        <select
                            name="IntrestedOrNot"
                            value={formData.IntrestedOrNot}
                            onChange={handleChange}
                            className="peer w-full px-4 py-3 bg-white border-2 border-teal-300 text-teal-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 rounded-lg appearance-none"
                            required
                        >
                            <option value="" className="text-gray-600">Select Option</option>
                            <option value="No" className="text-gray-600">No</option>
                            <option value="Yes" className="text-gray-600">Yes</option>
                            <option value="ND" className="text-gray-600">Not Decided</option>
                        </select>
                        <label
                            className="absolute left-4 top-0 text-teal-600 text-sm transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-teal-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-teal-600"
                        >
                            Intrested to take Know More about CSMSS?
                        </label>
                        <svg
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg hover:shadow-teal-600/50"
                    >
                        Start Your Exam Now!
                    </button>
                </form>
            </div>
        </section>
    );
};

export default MCQForm;