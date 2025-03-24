import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './css/SignIn.css'; // Import the CSS file for styling

function SignIn() {
  const [email, setEmail] = useState('');  // Capture email
  const [password, setPassword] = useState('');  // Capture password
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending email and password as LoginRequest object
      const response = await axios.post('https://localhost:7228/api/Admin', {
        email,
        password
      });

      // Assuming the API response contains UserId
      const { userId } = response.data;
      if (response.status === 200 && userId) {
        localStorage.setItem('UserId', userId);  // Set UserId in localStorage
        console.log(`User ID: ${userId}`);  // Log UserId to the console

        // Redirecting to dashboard after successful login
        navigate('/dashboard');  
      } else {
        alert('Login failed, please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid email or password');
    }
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">Welcome Admin Portal </h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group"> 
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Capture email input
            required
          />
        </div>
        <div className="input-group"> 
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Capture password input
            required
          />
        </div>
        <button type="submit" className="signin-button">Login</button>
      </form>
    
    </div>
  );
}

export default SignIn;
