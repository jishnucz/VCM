// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ token, element }) => {
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If there's a token, render the protected route
  return element;
};

export default PrivateRoute;
