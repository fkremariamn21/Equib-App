import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!user) {
    // Not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if the user has one of the allowed roles
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Unauthorized role, redirect to a forbidden page or dashboard
    return <Navigate to="/dashboard" replace />; // Or /forbidden
  }

  return <Outlet />; // Render child routes
};

export default ProtectedRoute;