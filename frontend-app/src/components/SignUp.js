import React, { useState } from 'react';
import axios from 'axios';
import './css/SignUp.css'; // Ensure this path is correct

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    indexNumber: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    indexNumber: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', indexNumber: '', phoneNumber: '', password: '', confirmPassword: '' };

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    // Index Number Validation
    if (!/^\d{5}$/.test(formData.indexNumber)) {
      newErrors.indexNumber = 'Index number must be exactly 5 digits.';
      isValid = false;
    }

    // Phone Number Validation
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits.';
      isValid = false;
    }

    // Password Validation
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    // Confirm Password Validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
     
      const randomUserId = Math.floor(Math.random() * 900000) + 100000;

      const requestData = {
        userId: randomUserId.toString(),
        fullName: formData.fullName,
        email: formData.email,
        indexNumber: formData.indexNumber,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      };

      try {
        // Use axios for sending the POST request
        const response = await axios.post('https://localhost:7228/api/DemoApi/create-user', requestData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

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

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Your Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="form-input"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="indexNumber">Index Number</label>
          <input
            type="text"
            id="indexNumber"
            name="indexNumber"
            className="form-input"
            placeholder="Enter your index number"
            value={formData.indexNumber}
            onChange={handleChange}
            required
          />
          {errors.indexNumber && <p className="error-message">{errors.indexNumber}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="form-input"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Create Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            placeholder="Create a new password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-input"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
        <p className="login-link">
          Already have an account? <a href="/">Sign in here</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
