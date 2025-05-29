// src/pages/Auth/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../services/authService";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(name, email, password, role);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-20"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-900">
          🌟 Registration Page 
        </h1>

        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

          <input
            type="text"
            placeholder="Name"
            className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition duration-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-label="Name"
          />

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
            className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition duration-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />

          <select
            className="mb-6 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition duration-200"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            aria-label="Select Role"
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-700 text-white p-3 rounded-lg hover:bg-indigo-800 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
