import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button/Button'; // Example reusable button
import './LoginPage.css';
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await login(username, password);
      navigate('/dashboard'); // Redirect to dashboard on successful login
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="login-container">
      <h2>Ahadu Bank Equib Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br></br>
        <br></br>
        {error && <p className="error-message">{error}</p>}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
};

export default LoginPage;