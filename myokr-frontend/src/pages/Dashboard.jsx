// src/pages/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Logout function clears the token and redirects to login
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  return (
    <div className="p-4">
      <h1 className="text-3xl">Dashboard</h1>
      <p>Welcome! This is your OKR dashboard. Build your features here.</p>
      <button 
        onClick={handleLogout} 
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
