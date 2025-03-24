import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/AdminDashboard.css';

const AdminDashboard = () => {
  const [studentNumber, setStudentNumber] = useState('');
  const [module, setModule] = useState('CS101');
  const [quizMarks, setQuizMarks] = useState('');
  const [inClassTestMarks, setInClassTestMarks] = useState('');
  const [assignmentMarks, setAssignmentMarks] = useState('');
  const [finalPaperMarks, setFinalPaperMarks] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const validateForm = () => {
    if (!studentNumber || !module || !quizMarks || !inClassTestMarks || !assignmentMarks || !finalPaperMarks) {
      alert('Please fill out all fields.');
      return false;
    }
    return true;
  };

  const handleDeleteItem = (index, setter) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        studentNumber,
        quizMarks,
        inClassTestMarks,
        assignmentMarks,
        finalPaperMarks,
        module,
      };

      try {
        const response = await axios.post(
          'https://localhost:7228/api/StudentM/create-StudentM',
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log(response.data);

        if (response.data) {
          alert('Registration successful!');
        } else {
          alert('Registration failed.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error during registration.');
      }
    }
  };

  const handleSignOut = () => {
    navigate('/');
  };

  const handleInsertAnnouncement = async (newAnnouncement) => {
    try {
      const response = await axios.post(
        'https://localhost:7228/api/Annousment/create-annousment',
        { description: newAnnouncement }, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Announcement created:', response.data);
      alert('Announcement added successfully!');
    } catch (error) {
      console.error('Error creating announcement:', error);
      alert('Error adding announcement.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="input-section section">
        <h2>Enter Student Details</h2>
        <div className="input-group">
          <input
            type="text"
            value={studentNumber}
            onChange={(e) => handleInputChange(e, setStudentNumber)}
            placeholder="Enter student number"
          />
        </div>
        <div className="input-group">
          <select value={module} onChange={(e) => setModule(e.target.value)}>
            <option value="CS101">CS101</option>
            <option value="CS102">CS102</option>
            <option value="CS103">CS103</option>
            <option value="CS104">CS104</option>
          </select>
        </div>
      </div>

      <div className="marks-section section">
        <h2>Enter Marks</h2>
        <div className="input-group">
          <input
            type="text"
            value={quizMarks}
            onChange={(e) => handleInputChange(e, setQuizMarks)}
            placeholder="Quiz Marks"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            value={inClassTestMarks}
            onChange={(e) => handleInputChange(e, setInClassTestMarks)}
            placeholder="In-Class Test Marks"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            value={assignmentMarks}
            onChange={(e) => handleInputChange(e, setAssignmentMarks)}
            placeholder="Assignment Marks"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            value={finalPaperMarks}
            onChange={(e) => handleInputChange(e, setFinalPaperMarks)}
            placeholder="Final Paper Marks"
          />
        </div>
        <div className="button-group">
          <button onClick={handleSubmit}>Submit Student Data</button>
        </div>
      </div>

      <div className="announcement-section section">
        <h2>Manage Announcements</h2>
        <div className="announcement-input">
          <textarea
            placeholder="Enter announcement"
            onBlur={(e) => setAnnouncements([...announcements, e.target.value])}
          ></textarea>
          <div className="button-group">
            <button
              onClick={() => {
                const lastAnnouncement = announcements[announcements.length - 1];
                if (lastAnnouncement) {
                  handleInsertAnnouncement(lastAnnouncement); // Sending the latest announcement to backend
                }
              }}
            >
              Insert Announcement
            </button>
            <button onClick={() => handleDeleteItem(announcements.length - 1, setAnnouncements)}>
              Delete Last Announcement
            </button>
          </div>
        </div>
        <div className="announcement-list">
          {announcements.map((announcement, index) => (
            <div key={index} className="announcement-item">
              {announcement}
            </div>
          ))}
        </div>
      </div>

      <div className="data-table section">
        <h2>Data Overview</h2>
        <table>
          <thead>
            <tr>
              <th>Student Number</th>
              <th>Module</th>
              <th>Quiz Marks</th>
              <th>In-Class Test Marks</th>
              <th>Assignment Marks</th>
              <th>Final Paper Marks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{studentNumber}</td>
              <td>{module}</td>
              <td>{quizMarks}</td>
              <td>{inClassTestMarks}</td>
              <td>{assignmentMarks}</td>
              <td>{finalPaperMarks}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="button-group section">
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
