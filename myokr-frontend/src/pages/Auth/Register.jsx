// src/pages/Auth/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../services/authService"; // Ensure this path is correct

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // New state for role, default to 'user'
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Pass the selected role to the register service
      // The backend will validate this against the schema's enum
      await register(name, email, password, role);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", err);
      // Optional: More specific error messages from backend
      // if (err.response && err.response.data && err.response.data.message) {
      //   setError(err.response.data.message);
      // }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-r from-purple-400 to-blue-600 animate-gradient"></div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">
          🌟 Welcome to the Registration! 🌟
        </h1>
        <form
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full transition-transform transform hover:scale-105 hover:shadow-xl duration-200"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Register
          </h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {/* Name Input */}
          <input
            type="text"
            placeholder="Name"
            className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-label="Name"
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />

          {/* Role Selection (New Dropdown) */}
          <select
            className="mb-6 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            aria-label="Select Role"
          >
            {/* It's usually good practice to have 'user' as the default/most common registration role */}
            <option value="user">User</option>
            {/* Uncomment these if you want to allow direct registration as manager/admin from this page */}
            <option value="manager">Manager</option> 
            <option value="admin">Admin</option>
          </select>

          {/* Register Button */}
          <button
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
            type="submit"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;