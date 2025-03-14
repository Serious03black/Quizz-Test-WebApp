import React, { useState } from 'react';
import axios from 'axios';

const Upload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data); // Show success message
      onUploadSuccess(); // Fetch questions after successful upload
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file.');
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Upload Excel File</h2>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: '10px', padding: '5px 10px' }}>
        Upload
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Upload;