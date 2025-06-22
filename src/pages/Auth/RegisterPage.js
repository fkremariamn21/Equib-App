import React, { useState } from 'react';
// Corrected: Import Link along with useNavigate
import { Link, useNavigate } from 'react-router-dom'; // Changed 'Route' to 'Link'
import { useAuth } from '../../contexts/AuthContext'; // Assuming AuthContext has a register function
import Button from '../../components/Button/Button'; // Reusable Button component
import './RegisterPage.css'; // Component-specific styles

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth(); // Assuming AuthContext provides a register function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!username || !password || !fullName || !email || !phoneNumber) {
      setError('All fields are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const registrationSuccessful = await register({
        fullName,
        email,
        phoneNumber,
        username,
        password,
      });

      if (registrationSuccessful) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after successful registration
        }, 2000);
      } else {
        setError('Registration failed. Please try again.');
      }

    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Add the wrapper for centering, similar to LoginPage
    <div className="register-page-wrapper">
      <div className="register-container">
        <h2>Register for Ahadu Bank Equib</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group1"> {/* Consider changing to 'form-group' for consistency */}
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group1">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-group1">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group1">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group1">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link> {/* FIXED THIS LINE */}
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;