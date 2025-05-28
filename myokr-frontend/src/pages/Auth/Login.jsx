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
      console.log("here is the response data=============",data)
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-r from-purple-400 to-blue-600 animate-gradient"></div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">
           Welcome to the OKR Application 🎉
        </h1>
        <form className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full transition-transform transform hover:scale-105 hover:shadow-xl duration-200" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Login</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <input 
            type="email"
            placeholder="Email"
            className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            aria-label="Email"
          />
          <input 
            type="password"
            placeholder="Password"
            className="mb-6 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            aria-label="Password"
          />
          <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300" type="submit">
            Login
          </button>
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;