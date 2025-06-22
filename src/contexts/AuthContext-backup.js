import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api'; // Your API client

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Validate token with backend or decode if JWT and still valid
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // In a real app, you'd fetch user data based on the token
      // For simplicity, we'll just set a dummy user if token exists
      setUser({ username: 'john.doe', role: 'member' }); // Replace with actual user data
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      setIsLoading(true);
      const response = await api.post('/auth/login', { username, password });
      const { token, user: userData } = response.data;
      localStorage.setItem('authToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      // Handle specific error messages from backend
      throw new Error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);