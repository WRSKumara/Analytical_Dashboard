import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/Sidebar.css'; // Import CSS for styling
import userPhoto from './avatr.png'; // Path to your default user photo

function Sidebar() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('UserId'); // Fetch UserId from local storage
  const [userImage, setUserImage] = useState(userPhoto); // State for user image

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setError('User ID not found.');
      return;
    }

    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/StudentDetails/get-StudentDetails/${userId}`);
        console.log('Fetched Student Data:', response.data);
        setStudentData(response.data);

        const photo = await getUserPhoto(response.data.indexNumber);
        setUserImage(photo);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Failed to fetch student data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [userId]);


  const getUserPhoto = async (indexNumber) => {
    if (!indexNumber) return userPhoto; // Return default photo if indexNumber is not available
  
    const formats = ['jpg', 'jpeg', 'png'];
    for (const format of formats) {
      const imageUrl = `https://students.nsbm.ac.lk/umis_student_profile/stimg/${indexNumber}.${format}`;
      console.log("Checking image URL:", imageUrl); // Log the image URL
      const isValid = await checkImageExists(imageUrl);
      if (isValid) {
        return imageUrl;
      }
    }
    return userPhoto; // Fallback to default photo if none found
  };
  

  // Function to check if an image exists at the given URL
  const checkImageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img 
          src={userImage} 
          alt="User" 
          className="user-photo" 
        />
        <h3>{loading ? 'Loading...' : error ? error : studentData?.fullName || 'User not found'}</h3> {/* Dynamic user name */}
      </div>
      <ul className="sidebar-menu">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile">My Profile</Link></li>
        <li><Link to="/eventCalendar">Event Calendar</Link></li>
        <li><Link to="/announcement">Announcements</Link></li>
        <li><Link to="/">Log Out</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
