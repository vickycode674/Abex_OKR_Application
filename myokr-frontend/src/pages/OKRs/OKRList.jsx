// src/pages/OKRs/OKRList.jsx

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const OKRList = () => {
  const [okrs, setOkrs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOKRs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/okrs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOkrs(res.data);
      } catch (err) {
        console.error("Failed to fetch OKRs", err);
      }
    };

    fetchOKRs();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-100 to-blue-50">
        <Navbar />
        <main className="p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-blue-900">All OKRs</h2>
            <Link
              to="/okr/create"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
            >
              + Create OKR
            </Link>
          </div>

          {okrs.length === 0 ? (
            <p className="text-gray-600">No OKRs found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {okrs.map((okr) => (
                <div
                  key={okr._id}
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">
                    {okr.objective}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    {okr.keyResults || "No description"}
                  </p>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-800">Progress:</span>{" "}
                    {okr.progress || 0}%
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Team:</span>{" "}
                    {okr.team?.name || "Unassigned"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OKRList;
