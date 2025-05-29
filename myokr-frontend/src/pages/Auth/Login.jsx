// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = await login(email, password);
      const { token } = data;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error("Login error:", err);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Subtle abstract shapes background */}
      <div className="absolute inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-20"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-900">
          Login 🎉
        </h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          <input 
            type="email"
            placeholder="Email"
            className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition duration-200"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            aria-label="Email"
          />
          <input 
            type="password"
            placeholder="Password"
            className="mb-6 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition duration-200"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            aria-label="Password"
          />
          <button 
            type="submit" 
            className="w-full bg-indigo-700 text-white p-3 rounded-lg hover:bg-indigo-800 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-700 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
