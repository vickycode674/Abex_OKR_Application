import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";

// Custom hook for animated counting
function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const startTime = useRef(null);

  useEffect(() => {
    let animationFrame;

    function step(timestamp) {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const progressPercent = Math.min(progress / duration, 1);
      setCount(Math.floor(progressPercent * target));
      if (progress < duration) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    }

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return count;
}

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
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/summary`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard summary", err);
      }
    };

    fetchSummary();
  }, [token]);

  // Animate counts
  const animatedOKRs = useCountUp(summary.totalOKRs);
  const animatedTeams = useCountUp(summary.totalTeams);
  const animatedUsers = useCountUp(summary.activeUsers);
  const animatedDepartments = useCountUp(summary.totalDepartments);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">
        <Navbar />
        <main className="p-6 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Welcome back! 👋</h2>
          <p className="text-lg text-indigo-700 font-medium max-w-xl">
            Your favorite OKR app is here to help you to reach goals and keep your teams aligned 🚀
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="bg-white p-6 shadow-xl rounded-xl border-t-4 border-blue-500 hover:scale-105 transform transition duration-300">
              <h3 className="text-lg font-semibold text-gray-600">Total OKRs</h3>
              <p className="text-4xl text-blue-600 font-extrabold">{animatedOKRs}</p>
            </div>

            <div className="bg-white p-6 shadow-xl rounded-xl border-t-4 border-green-500 hover:scale-105 transform transition duration-300">
              <h3 className="text-lg font-semibold text-gray-600">Teams</h3>
              <p className="text-4xl text-green-600 font-extrabold">{animatedTeams}</p>
            </div>

            <div className="bg-white p-6 shadow-xl rounded-xl border-t-4 border-purple-500 hover:scale-105 transform transition duration-300">
              <h3 className="text-lg font-semibold text-gray-600">Active Users</h3>
              <p className="text-4xl text-purple-600 font-extrabold">{animatedUsers}</p>
            </div>

            <div className="bg-white p-6 shadow-xl rounded-xl border-t-4 border-yellow-500 hover:scale-105 transform transition duration-300">
              <h3 className="text-lg font-semibold text-gray-600">Departments</h3>
              <p className="text-4xl text-yellow-600 font-extrabold">{animatedDepartments}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
