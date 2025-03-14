/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const LandingPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        Address: '',
        college: '',
        domain: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Send student info to the backend
            const response = await axios.post('http://localhost:5000/api/student', formData);
            console.log('Student data saved:', response.data);
            // Save student info to localStorage (optional)
            localStorage.setItem('studentInfo', JSON.stringify(formData));
    
            // Navigate to the test page
            navigate('/test');
        } catch (error) {
            console.error('Error saving student data:', error);
            alert('Failed to save student data. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to the MCQ Test</h1>
            <p style={styles.subHeading}>Please fill out the form below to start the test.</p>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Division:</label>
                    <input
                        type="text"
                        name="div"
                        value={formData.div}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>College of 12th:</label>
                    <input
                        type="text"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Interested Domain:</label>
                    <select
                        name="domain"
                        value={formData.domain}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    >
                        <option value="">Select Domain</option>
                        <option value="CSE">Computer Science Engineering (CSE)</option>
                        <option value="Civil">Civil Engineering</option>
                        <option value="Mechanical">Mechanical Engineering</option>
                        <option value="Electrical">Electrical Engineering</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button type="submit" style={styles.button}>Start Test</button>
            </form>
        </div>
    );
};

export default LandingPage;

// Inline styles for the component
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f4f8',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '10px',
    },
    subHeading: {
        fontSize: '1.2rem',
        color: '#666',
        marginBottom: '30px',
    },
    form: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    formGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        fontSize: '1rem',
        color: '#555',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        outline: 'none',
    },
    button: {
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};