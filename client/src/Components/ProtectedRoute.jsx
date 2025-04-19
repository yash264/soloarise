// src/Components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If token doesn't exist, redirect to login
    return <Navigate to="/dungeon" replace />;
  }

  return Component;
};

export default ProtectedRoute;
