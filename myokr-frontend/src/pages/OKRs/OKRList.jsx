// src/pages/OKRs/OKRList.jsx

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { updateOKR } from "../../services/OKRService";

const OKRList = () => {
  const [okrs, setOkrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch OKRs function (now a standalone async function)
  const fetchOKRs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/okrs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOkrs(res.data);
    } catch (err) {
      console.error("Failed to fetch OKRs", err);
      setError("Failed to load OKRs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOKRs();
  }, [token]); // Depend on token

  // Helper function to render key results
  const renderKeyResults = (keyResults) => {
    if (!keyResults || keyResults.length === 0) {
      return <p className="text-sm italic text-gray-500">No key results provided.</p>;
    }
    const krs = Array.isArray(keyResults) ? keyResults : [keyResults];
    return (
      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
        {krs.map((kr, idx) => (
          <li key={idx} className="text-gray-600">
            {kr}
          </li>
        ))}
      </ul>
    );
  };

  const handleDeleteOKR = async (okrId) => {
    if (window.confirm("Are you sure you want to delete this OKR? This action cannot be undone.")) {
      try {
        await axios.delete(`http://localhost:5000/api/okrs/${okrId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Filter out the deleted OKR from the current state to update UI immediately
        setOkrs(okrs.filter((okr) => okr._id !== okrId));
        alert("OKR deleted successfully!");
      } catch (err) {
        console.error("Failed to delete OKR", err);
        alert("Failed to delete OKR. Please try again.");
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 tracking-tight">
                Your OKRs ✨
              </h2>
              <Link
                to="/okr/create"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Create New OKR
              </Link>
            </div>

            {/* Loading, Error, or No OKRs state */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="ml-4 text-blue-600 text-lg">Loading OKRs...</p>
              </div>
            ) : error ? (
              <div className="text-red-600 bg-red-100 border border-red-200 p-4 rounded-lg text-center mt-10">
                <p>{error}</p>
              </div>
            ) : okrs.length === 0 ? (
              <div className="text-gray-600 bg-white p-8 rounded-lg shadow-sm text-center mt-10 border border-gray-200">
                <p className="text-lg mb-4">You haven't created any OKRs yet.</p>
                <Link
                  to="/okr/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Start by creating your first OKR!
                </Link>
              </div>
            ) : (
              /* OKRs Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {okrs.map((okr) => (
                  <div
                    key={okr._id}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border border-gray-200 flex flex-col"
                  >
                    <h3 className="text-xl font-bold text-blue-800 mb-3 leading-snug">
                      {okr.objective}
                    </h3>
                    {/* Removed description from here to simplify card, can be in details page */}
                    {/* <p className="text-sm text-gray-700 mb-4 flex-grow">
                      {okr.description || <span className="italic text-gray-500">No description provided.</span>}
                    </p> */}

                    {/* Key Results Section */}
                    <div className="mb-4 flex-grow"> {/* Added flex-grow here */}
                      <p className="font-semibold text-gray-800 mb-2">Key Results:</p>
                      {renderKeyResults(okr.keyResults)}
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-800">Progress:</span>
                        <span className="text-sm font-bold text-blue-600">{okr.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${okr.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Team & Assigned To */}
                    <div className="text-sm text-gray-600 mt-auto">
                      <p className="mb-1">
                        <span className="font-medium text-gray-800">Team:</span>{" "}
                        {okr.team?.name || "Unassigned"}
                      </p>
                      {okr.assignedTo && okr.assignedTo.length > 0 && (
                        <p>
                          <span className="font-medium text-gray-800">Assigned To:</span>{" "}
                          {okr.assignedTo.map((user) => user.name).join(", ") || "N/A"}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons (View Details, Edit, Delete) */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-3"> {/* Added border-top for separation */}

                      <Link
                        to={`/okr/edit/${okr._id}`}
                        className="text-purple-600 hover:text-purple-800 text-sm font-semibold transition duration-150"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteOKR(okr._id)}
                        className="text-red-600 hover:text-red-800 text-sm font-semibold transition duration-150"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OKRList;