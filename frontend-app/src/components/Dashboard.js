import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import './css/Dashboard.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem('UserId');
  const [detailedData, setDetailedData] = useState([]);
  const student = {
    id: '123456',
    year: 'Year 2',
    semester: 'Semester 2',
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/StudentDetails/get-StudentDetails/${userId}`);
        console.log('API Response:', response.data);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDetailedMarks = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/StudentM/get-users/${userId}`);
        console.log('Detailed Marks Data:', response.data);

      
        let marksData = Array.isArray(response.data) ? response.data : [response.data];

    
        setDetailedData(marksData.map(item => ({
          module: item.module,
          quizMarks: Number(item.quizMarks),
          inClassTestMarks: Number(item.inClassTestMarks),
          assignmentMarks: Number(item.assignmentMarks),
          finalPaperMarks: Number(item.finalPaperMarks),
        })));
      } catch (error) {
        console.error('Error fetching detailed marks:', error);
      }
    };

    fetchDetailedMarks();
    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data found.</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="student-info">
        <p><strong>Student ID:</strong> {userData.indexNumber || 'N/A'}</p>
        <p><strong>{student.year}</strong> - <strong>{student.semester}</strong></p>
      </div>

      <div className="dashboard-content">
        <div className="table-section">
          <div className="module-table">
            <h3>Semester Modules and Marks</h3>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Module</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {detailedData.map((item, index) => (
                  <tr key={index} className={item.marks < 25 ? 'low-marks' : ''}>
                    <td>{item.module}</td>
                    <td>{item.quizMarks + item.inClassTestMarks + item.assignmentMarks + item.finalPaperMarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="detailed-marks-table">
            <h3>Detailed Marks by Module</h3>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Module</th>
                  <th>Quiz Marks</th>
                  <th>In-Class Test Marks</th>
                  <th>Assignment Marks</th>
                  <th>Final Paper Marks</th>
                  <th>Total Marks</th>
                </tr>
              </thead>
              <tbody>
                {detailedData.map((item, index) => {
                  const totalMarks = item.quizMarks + item.inClassTestMarks + item.assignmentMarks + item.finalPaperMarks;
                  return (
                    <tr key={index} className={item.quizMarks < 25 || item.inClassTestMarks < 25 || item.assignmentMarks < 25 || item.finalPaperMarks < 25 ? 'low-marks' : ''}>
                      <td>{item.module}</td>
                      <td>{item.quizMarks}</td>
                      <td>{item.inClassTestMarks}</td>
                      <td>{item.assignmentMarks}</td>
                      <td>{item.finalPaperMarks}</td>
                      <td>{totalMarks}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="graph-section">
          <div className="bar-chart">
            <h3>Marks Visualization</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={detailedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="module" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={25} stroke="red" strokeDasharray="3 3" label="25 Marks" />
                <Bar dataKey="quizMarks" fill="#8884d8" />
                <Bar dataKey="inClassTestMarks" fill="#82ca9d" />
                <Bar dataKey="assignmentMarks" fill="#ffc658" />
                <Bar dataKey="finalPaperMarks" fill="#ff7300" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pie-charts">
            <h3>Module-wise Marks Distribution</h3>
            <div className="pie-charts-grid">
              {detailedData.map((item, index) => (
                <div key={index} className="pie-chart-container">
                  <h4>{item.module}</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Quiz Marks', value: item.quizMarks },
                          { name: 'In-Class Test Marks', value: item.inClassTestMarks },
                          { name: 'Assignment Marks', value: item.assignmentMarks },
                          { name: 'Final Paper Marks', value: item.finalPaperMarks },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          </div>

          <div className="section section-4">
            <h3>Additional Information</h3>
            <p>This section can contain more details or information relevant to the dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
