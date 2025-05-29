import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getOKRById } from "../../services/OKRService";

const EditOKR = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [objective, setObjective] = useState("");
  const [keyResults, setKeyResults] = useState([""]);
  const [progress, setProgress] = useState(0);
  const [team, setTeam] = useState("");
  const [teamsList, setTeamsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
       const okrRes = await getOKRById(id, token);
        const okr = okrRes.data;

        setObjective(okr.objective || "");
        setKeyResults(okr.keyResults || [""]);
        setProgress(okr.progress || 0);
        setTeam(okr.team?._id || "");

        const teamsRes = await axios.get("http://localhost:5000/api/teams", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeamsList(teamsRes.data);
        console.log("here is the team res================",teamsRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/okrs/${id}`,
        {
          objective,
          keyResults: keyResults.filter((kr) => kr.trim() !== ""),
          progress,
          team,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/okrs");
    } catch (err) {
      console.error("Failed to update OKR", err);
      alert("Failed to update OKR. Please try again.");
    }
  };

  const updateKeyResult = (index, value) => {
    const updated = [...keyResults];
    updated[index] = value;
    setKeyResults(updated);
  };

  const addKeyResult = () => setKeyResults([...keyResults, ""]);
  const removeKeyResult = (index) =>
    setKeyResults(keyResults.filter((_, i) => i !== index));

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-100 to-blue-50">
        <Navbar />
        <main className="p-6 overflow-y-auto">
          <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Edit OKR</h2>
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-gray-700 font-medium mb-1">Objective</label>
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Key Results</label>
                {keyResults.map((kr, index) => (
                  <div key={index} className="flex items-center mb-2 space-x-2">
                    <input
                      type="text"
                      value={kr}
                      onChange={(e) => updateKeyResult(index, e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2"
                      required
                    />
                    {keyResults.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeKeyResult(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addKeyResult}
                  className="text-sm text-blue-600 hover:underline"
                >
                  + Add Key Result
                </button>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Progress</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-center text-blue-600 font-medium">{progress}%</div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Team</label>
                <select
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
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

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Update OKR
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditOKR;
