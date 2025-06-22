import axios from 'axios';

const api = axios.create({
  //baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api', // Your backend API base URL
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/pages/Dashboard', // Your backend API base URL

  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to handle expired tokens or unauthenticated responses
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page or show a session expired message
      console.warn('Session expired or unauthorized. Please log in again.');
      // Example: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;