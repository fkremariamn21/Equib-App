// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Assuming these imports are correct based on your file structure
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // This should be correct path to your ProtectedRoute
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage'; // Changed from SignupPage based on your App.js
import DashboardPage from './pages/Dashboard/DashboardPage';
import EquibGroupListPage from './pages/EquibGroups/EquibGroupListPage';
import EquibGroupDetailsPage from './pages/EquibGroups/EquibGroupDetailsPage';
import CreateEquibGroupPage from './pages/EquibGroups/CreateEquibGroupPage';
import ProfilePage from './pages/Profile/ProfilePage'; // Assuming your ProfilePage is in src/pages/Profile
import NotFoundPage from './pages/NotFoundPage'; // Assuming your NotFoundPage is directly in src/pages
import Header from './components/Header/Header'; // Assuming your Header is in src/components/Header

function App() {
  const { isLoading, user } = useAuth(); // useAuth should be imported from AuthContext, as you have it

  // If AuthContext is still loading, show a loading message
  if (isLoading) {
    return <div>Loading application...</div>;
  }

  return (
    <Router>
      {/* Only show Header if the user is logged in */}
      {user && <Header />}
      
      <main> {/* Use <main> for your main content area for semantic HTML */}
        <Routes>
          {/* Public Routes - Accessible to anyone */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> {/* Using /register as per your App.js */}

          {/* Protected Routes - Only accessible if logged in */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/equib-groups" element={<EquibGroupListPage />} />
            <Route path="/equib-groups/:id" element={<EquibGroupDetailsPage />} />
            {/* Consolidated and corrected path for Create Equib Group Page.
                It must be inside ProtectedRoute as creating a group requires login. */}
            <Route path="/equib-groups/create" element={<CreateEquibGroupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* Add any other protected routes here */}
          </Route>

          {/* Root Path - Redirect based on login status */}
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          
          {/* Catch-all for unmatched routes - Should be the last route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;