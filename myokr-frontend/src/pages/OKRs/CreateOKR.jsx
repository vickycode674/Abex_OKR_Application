// src/pages/OKRs/CreateOKR.jsx

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateOKR = () => {
  const [objective, setObjective] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [keyResults, setKeyResults] = useState([""]);
  const [team, setTeam] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);

  const [teamsList, setTeamsList] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const navigate = useNavigate();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/teams`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeamsList(teamsRes.data);
      } catch (error) {
        console.error("Error loading teams:", error);
      }
    };
    if (token) fetchTeams();
  }, [token]);

  useEffect(() => {
    const fetchUsersByTeam = async () => {
      if (team) {
        try {
          const usersRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/team/${team}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsersList(usersRes.data);
          setAssignedTo([]);
        } catch (error) {
          console.error(`Error loading users for team ${team}:`, error);
          setUsersList([]);
        }
      } else {
        setUsersList([]);
        setAssignedTo([]);
      }
    };
    fetchUsersByTeam();
  }, [team, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!objective.trim() || keyResults.some((kr) => !kr.trim()) || !team) {
      alert("Please fill in Objective, Key Results, and select a Team.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/okrs",
        {
          objective,
          description,
          progress,
          keyResults: keyResults.filter((kr) => kr.trim() !== ""),
          team,
          assignedTo,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/okrs");
    } catch (err) {
      console.error("Failed to create OKR:", err);
      alert("Failed to create OKR. Please check your inputs and try again.");
    }
  };

  const addKeyResult = () => setKeyResults([...keyResults, ""]);
  const updateKeyResult = (index, value) => {
    const newKR = [...keyResults];
    newKR[index] = value;
    setKeyResults(newKR);
  };
  const removeKeyResult = (index) => {
    const newKR = keyResults.filter((_, i) => i !== index);
    setKeyResults(newKR);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-rose-100 via-sky-100 to-indigo-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-200 backdrop-blur-sm">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-6">
              🚀 Create New OKR
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Objective */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Objective</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  placeholder="e.g., Improve customer experience"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  className="w-full p-3 rounded-md border border-gray-300 shadow-sm resize-y min-h-[80px] focus:ring-blue-500 focus:border-blue-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide additional context"
                />
              </div>

              {/* Key Results */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Key Results</label>
                {keyResults.map((kr, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 p-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      value={kr}
                      onChange={(e) => updateKeyResult(index, e.target.value)}
                      placeholder={`Key Result ${index + 1}`}
                      required
                    />
                    {keyResults.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeKeyResult(index)}
                        className="text-red-500 hover:text-red-700"
                        title="Remove Key Result"
                      >
                        ✖
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addKeyResult}
                  className="text-sm font-medium text-blue-700 hover:underline"
                >
                  ➕ Add another key result
                </button>
              </div>

              {/* Progress */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Initial Progress: {progress}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Team Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Assign to Team</label>
                <select
                  className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  required
                >
                  <option value="">Select Team</option>
                  {teamsList.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Users Selection */}
              {team && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Assign to Users</label>
                  {usersList.length > 0 ? (
                    <>
                      <select
                        multiple
                        className="w-full p-3 rounded-md border border-gray-300 shadow-sm min-h-[100px] focus:ring-blue-500 focus:border-blue-500"
                        value={assignedTo}
                        onChange={(e) =>
                          setAssignedTo([...e.target.selectedOptions].map((o) => o.value))
                        }
                      >
                        {usersList.map((u) => (
                          <option key={u._id} value={u._id}>
                            {u.name}
                          </option>
                        ))}
                      </select>
                      <small className="text-gray-500">Hold Ctrl (Windows) or Cmd (Mac) to select multiple users</small>
                    </>
                  ) : (
                    <p className="text-gray-500 italic">No users found for the selected team.</p>
                  )}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              >
                Create OKR
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateOKR;
