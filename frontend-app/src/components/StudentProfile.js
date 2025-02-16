import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/StudentProfile.css'; // Import CSS for styling
import userPhoto from './avatr.png';

// Function to check if an image exists at the given URL
const checkImageExists = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

// Function to get user photo based on the index number
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

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(userPhoto); // State for user photo
  const userId = localStorage.getItem('UserId'); // Fetch UserId from local storage

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`https://localhost:7228/api/StudentDetails/get-StudentDetails/${userId}`);
        console.log('Fetched Student Data:', response.data);
        setStudentData(response.data); // Store the fetched student data

        // Get the user's photo after student data is fetched
        const userPhotoUrl = await getUserPhoto(response.data.indexNumber);
        setPhotoUrl(userPhotoUrl); // Set the photo URL
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData(); // Call the fetch function
  }, [userId]);

  // Provide default values if studentData is undefined
  const {
    fullName = 'Thilina',
    email = 'btsandaruwan@gmail.com',
    indexNumber = 'N/A',
    phoneNumber = 'N/A',
    address = 'N/A',
  } = studentData || {}; // Use empty object as fallback

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={photoUrl} alt="Student" className="profile-photo" />
        <h2 className="profile-name">{fullName}</h2>
      </div>
      <table className="profile-table">
        <tbody>
          <tr>
            <th>Full Name</th>
            <td>{fullName}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{email}</td>
          </tr>
          <tr>
            <th>Index Number</th>
            <td>{indexNumber}</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>{phoneNumber}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{address}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StudentProfile;
