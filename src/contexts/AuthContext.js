// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api'; // Your API client (we'll bypass its actual call for now)

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // This useEffect will still run, so if there's an old token, it might attempt to validate it.
  // For this temporary bypass, we'll ensure it doesn't cause issues.
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real app, you'd decode or validate this token with your backend.
      // For temporary bypass, we just assume it's valid and set a user.
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ username: 'mockUser', role: 'user' }); // Set a dummy user if token exists
    }
    setIsLoading(false);
  }, []);

  // --- MODIFIED LOGIN FUNCTION (Temporary Bypass) ---
  const login = async (username, password) => {
    setIsLoading(true); // Start loading state
    return new Promise(resolve => {
      setTimeout(() => { // Simulate an asynchronous operation (like an API call)
        console.log(`Bypassing login authentication for user: ${username}`);
        // Set a dummy token and user data
        const dummyToken = `dummy-token-for-${username}-${Date.now()}`;
        const dummyUser = { username: username, role: 'user', id: 'mock-id-' + Date.now() };

        localStorage.setItem('authToken', dummyToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${dummyToken}`;
        setUser(dummyUser); // Set the dummy user
        setIsLoading(false); // End loading state
        console.log('Dummy login successful!');
        resolve(true); // Always resolve successfully
      }, 500); // Simulate a network delay of 500ms
    });
  };
  // --- END MODIFIED LOGIN FUNCTION ---


  const register = async (userData) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Bypassing registration authentication for:', userData.username);
        // Simulate a successful registration
        if (userData.username === 'test@example.com' || userData.username === 'admin') {
            reject(new Error('User already exists (simulated).'));
        } else {
            console.log('Dummy registration successful!');
            resolve(true); // Always resolve successfully for non-existing users
        }
        setIsLoading(false);
      }, 700);
    });
  };


  const logout = () => {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    console.log('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);