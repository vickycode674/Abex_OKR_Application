// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Login service call
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // This should include the token and user data
};

// Register service call
export const register = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password });
  return response.data;
};
