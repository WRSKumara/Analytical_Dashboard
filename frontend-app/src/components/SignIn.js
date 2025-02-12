import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; 
import './css/SignIn.css'; 
import userphoto from './bg.jpg'; // Ensure you have the correct path to your image

function SignIn() {
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7228/api/Login', {
        Email: email,  
        Password: password
      });

      const { userId, redirectUrl } = response.data;

      if (response.status === 200 && userId) {
        localStorage.setItem('UserId', userId); 
        console.log(`User ID: ${userId}`);  
        navigate(`../${redirectUrl}`);  
      } else {
        alert('Login failed, please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid email or password');
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h2 className="signin-title">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
              required
            />
          </div>
          <button type="submit" className="signin-button">Sign In</button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
      <div className="image-container">
        <img src={userphoto} alt="Background" />
      </div>
    </div>
  );
}

export default SignIn;
