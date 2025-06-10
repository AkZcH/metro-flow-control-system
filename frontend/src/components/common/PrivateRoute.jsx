import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to login but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in and tries to access login or register, redirect to dashboard
  if (location.pathname === '/login' || location.pathname === '/register') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PrivateRoute; 