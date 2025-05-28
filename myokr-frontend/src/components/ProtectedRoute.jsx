// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if the user has a token in localStorage
  const token = localStorage.getItem("token");
  
  // If token is not present, redirect to login
  if (!token) return <Navigate to="/login" />;
  
  return children;
};

export default ProtectedRoute;
