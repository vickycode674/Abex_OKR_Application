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
  const [assignedTo, setAssignedTo] = useState([]); // This will be used for users in the selected team

  const [teamsList, setTeamsList] = useState([]);
  const [usersList, setUsersList] = useState([]); // Will store users based on selected team

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch Teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsRes = await axios.get("http://localhost:5000/api/teams", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeamsList(teamsRes.data);
      } catch (error) {
        console.error("Error loading teams:", error);
        // Handle error, e.g., navigate to login if token is invalid
      }
    };
    fetchTeams();
  }, [token]); // Depend on token to refetch if it changes

  // Fetch Users based on selected team
  useEffect(() => {
    const fetchUsersByTeam = async () => {
      if (team) { // Only fetch if a team is selected
        try {
          const usersRes = await axios.get(`http://localhost:5000/api/users/team/${team}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsersList(usersRes.data);
          // Optional: Clear assignedTo if the team changes
          setAssignedTo([]);
        } catch (error) {
          console.error(`Error loading users for team ${team}:`, error);
          setUsersList([]); // Clear users list on error
        }
      } else {
        setUsersList([]); // Clear users if no team is selected
        setAssignedTo([]); // Clear assigned users
      }
    };
    fetchUsersByTeam();
  }, [team, token]); // Depend on team and token

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!objective.trim() || keyResults.some(kr => !kr.trim()) || !team) {
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
          keyResults: keyResults.filter(kr => kr.trim() !== ''), // Filter out empty KRs
          team,
          assignedTo, // Send selected assigned users
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/okrs"); // Navigate to OKRs list after successful creation
    } catch (err) {
      console.error("Failed to create OKR:", err);
      // You might want to display an error message to the user here
      alert("Failed to create OKR. Please check your inputs and try again.");
    }
  };

  // Add more KeyResults
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
    <div className="flex h-screen bg-gray-50"> {/* Softer overall background */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-auto"> {/* Gradient background for main content */}
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200"> {/* Enhanced form container */}
            <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
              🚀 Create New OKR
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased spacing */}

              {/* Objective */}
              <div>
                <label htmlFor="objective" className="block text-sm font-semibold text-gray-700 mb-1">Objective</label>
                <input
                  type="text"
                  id="objective"
                  className="w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  placeholder="e.g., Deliver an outstanding customer experience"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  id="description"
                  className="w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base resize-y min-h-[80px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide more details about this objective"
                ></textarea>
              </div>

              {/* Key Results */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Key Results</label>
                {keyResults.map((kr, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base"
                      value={kr}
                      onChange={(e) => updateKeyResult(index, e.target.value)}
                      placeholder={`Key Result ${index + 1}: e.g., Increase CSAT to 90%`}
                      required
                    />
                    {keyResults.length > 1 && ( // Allow removing if more than one KR
                      <button
                        type="button"
                        onClick={() => removeKeyResult(index)}
                        className="p-2 text-red-500 hover:text-red-700 transition duration-150 ease-in-out rounded-full"
                        title="Remove Key Result"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addKeyResult}
                  className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-0.5 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Key Result
                </button>
              </div>

              {/* Progress */}
              <div>
                <label htmlFor="progress" className="block text-sm font-semibold text-gray-700 mb-1">Initial Progress (%)</label>
                <input
                  type="range" // Use range input for sliders
                  id="progress"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
                <span className="block text-center text-blue-600 font-medium mt-1">{progress}%</span>
              </div>

              {/* Assign to Team */}
              <div>
                <label htmlFor="team" className="block text-sm font-semibold text-gray-700 mb-1">Assign to Team</label>
                <select
                  id="team"
                  className="w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base"
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

              {/* Assign to Users (conditional rendering based on team selection) */}
              {team && usersList.length > 0 && (
                <div>
                  <label htmlFor="assignedTo" className="block text-sm font-semibold text-gray-700 mb-1">Assign to Users (within selected team)</label>
                  <select
                    id="assignedTo"
                    multiple // Allows multiple selections
                    className="w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base min-h-[100px]" // Added min-height for visibility with multiple option
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
                  <small className="block mt-1 text-gray-500">Hold Ctrl (Windows) or Cmd (Mac) to select multiple users</small>
                </div>
              )}
               {team && usersList.length === 0 && (
                  <p className="text-gray-500 text-sm italic mt-2">No users found for the selected team.</p>
                )}


              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out text-lg shadow-md"
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