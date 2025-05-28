// src/pages/Dashboard/Index.jsx

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalOKRs: 0,
    totalTeams: 0,
    activeUsers: 0,
    totalDepartments: 0,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard summary", err);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-blue-50 to-purple-100">
        <Navbar />
        <main className="p-6 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Welcome back!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 shadow-xl rounded-xl border-t-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-600">Total OKRs</h3>
              <p className="text-3xl text-blue-600">{summary.totalOKRs}</p>
            </div>

            <div className="bg-white p-6 shadow-xl rounded-xl border-t-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-600">Teams</h3>
              <p className="text-3xl text-green-600">{summary.totalTeams}</p>
            </div>

            <div className="bg-white p-6 shadow-xl rounded-xl border-t-4 border-purple-500">
              <h3 className="text-lg font-semibold text-gray-600">Active Users</h3>
              <p className="text-3xl text-purple-600">{summary.activeUsers}</p>
            </div>

            <div className="bg-white p-6 shadow-xl rounded-xl border-t-4 border-yellow-500">
              <h3 className="text-lg font-semibold text-gray-600">Departments</h3>
              <p className="text-3xl text-yellow-600">{summary.totalDepartments}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
