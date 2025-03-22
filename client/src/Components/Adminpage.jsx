/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Added axios import
const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ id: '', password: '' });
  const [students, setStudents] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [file, setFile] = useState(null);
  const [studentFilter, setStudentFilter] = useState('all');
  const [questionFilter, setQuestionFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('students');

  const ADMIN_ID = 'admin123';
  const ADMIN_PASSWORD = 'password123';

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.id === ADMIN_ID && loginData.password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      console.log('Fetched students:', response.data); // Debug log
      setStudents(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/questions');
      console.log('Fetched questions:', response.data); // Debug log
      setQuestions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions([]);
    }
  };

  const handleDeleteAllStudents = async () => {
    if (window.confirm('Are you sure you want to delete all students?')) {
      try {
        await axios.delete('http://localhost:5000/api/students');
        alert('All students deleted successfully');
        fetchStudents();
      } catch (error) {
        console.error('Error deleting all students:', error);
        alert('Failed to delete all students');
      }
    }
  };

  const handleDeleteAllQuestions = async () => {
    if (window.confirm('Are you sure you want to delete all questions?')) {
      try {
        await axios.delete('http://localhost:5000/api/questions');
        alert('All questions deleted successfully');
        fetchQuestions();
      } catch (error) {
        console.error('Error deleting all questions:', error);
        alert('Failed to delete all questions');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('http://localhost:5000/api/upload-questions', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Questions uploaded successfully');
      fetchQuestions();
      setFile(null);
    } catch (error) {
      console.error('Error uploading questions:', error);
      alert('Failed to upload questions');
    }
  };

  const handleEdit = async (question) => {
    try {
      await axios.put(`http://localhost:5000/api/questions/${question.id}`, question);
      alert('Question updated successfully');
      fetchQuestions();
      setSelectedQuestion(null);
    } catch (error) {
      console.error('Error updating question:', error);
      alert('Failed to update question');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await axios.delete(`http://localhost:5000/api/questions/${id}`);
        alert('Question deleted successfully');
        fetchQuestions();
      } catch (error) {
        console.error('Error deleting question:', error);
        alert('Failed to delete question');
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStudents();
      fetchQuestions();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Admin ID</label>
              <input
                type="text"
                value={loginData.id}
                onChange={(e) => setLoginData({ ...loginData, id: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredStudents = students.filter(student => 
    studentFilter === 'all' || (student.Domain || student.fieldOfStudy) === studentFilter
  );

  const filteredQuestions = questions.filter(question => 
    questionFilter === 'all' || question.id.toString() === questionFilter
  );
  return (
    <div className="min-h-screen bg-gray-100 mt-40 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('students')}
                className={`${
                  activeTab === 'students'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Students
              </button>
              <button
                onClick={() => setActiveTab('questions')}
                className={`${
                  activeTab === 'questions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Questions
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'students' && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Students</h2>
              <div className="flex gap-4">
                <select
                  value={studentFilter}
                  onChange={(e) => setStudentFilter(e.target.value)}
                  className="rounded-md border-gray-300"
                >
                  <option value="all">All Students</option>
                  {[...new Set(students.map(s => s.Domain || s.fieldOfStudy))].map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
                <button
                  onClick={handleDeleteAllStudents}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Delete All Students
                </button>
              </div>
            </div>
            {filteredStudents.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">id</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th> {/* Added Marks column */}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry time</th> {/* Added Marks column */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{student.id || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.name || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.college || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.Domain || student.fieldOfStudy || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.contactNumber || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.marks || 'N/A'}</td> {/* Display marks */}
                        <td className="px-6 py-4 whitespace-nowrap">{student.EntryTime || 'N/A'}</td> {/* Display marks */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No students found</p>
            )}
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Questions</h2>
              <div className="flex gap-4">
                <button
                  onClick={handleDeleteAllQuestions}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Delete All Questions
                </button>
              </div>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <button
                onClick={handleUpload}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Upload Questions
              </button>
            </div>

            {filteredQuestions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Option 1</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Option 2</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Option 3</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Option 4</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Answer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredQuestions.map((question) => (
                      <tr key={question.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{question.question || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{question.option1 || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{question.option2 || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{question.option3 || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{question.option4 || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{question.answer || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                          <button
                            onClick={() => setSelectedQuestion(question)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(question.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No questions found</p>
            )}

            {selectedQuestion && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                  <h3 className="text-xl font-semibold mb-4">Edit Question</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEdit(selectedQuestion);
                    }}
                    className="space-y-4"
                  >
                    {['question', 'option1', 'option2', 'option3', 'option4', 'answer'].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                        <input
                          type="text"
                          value={selectedQuestion[field] || ''}
                          onChange={(e) =>
                            setSelectedQuestion({ ...selectedQuestion, [field]: e.target.value })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                    ))}
                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={() => setSelectedQuestion(null)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;