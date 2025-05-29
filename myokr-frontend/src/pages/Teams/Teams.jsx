import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", department: "" });
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  // --- Data Fetching Functions ---
  const fetchTeams = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/teams`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeams(res.data);
    } catch (err) {
      console.error("Error fetching teams:", err);
      setError("Failed to load teams.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/depts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
      setError("Failed to load departments.");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users.");
    }
  };

  // --- Initial Data Load on Component Mount ---
  useEffect(() => {
    if (token) {
        fetchTeams();
        fetchDepartments();
        fetchUsers();
    } else {
        setError("Authentication token not found. Please log in.");
        setLoading(false);
    }
  }, [token]);

  // --- Form Handlers ---
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/teams`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ name: "", department: "" });
      fetchTeams();
    } catch (err) {
      console.error("Error creating team:", err);
      setError("Failed to create team. Please try again.");
    }
  };

  const handleAddUser = async () => {
    setError(null);
    if (!selectedTeamId || !selectedUserId) {
      setError("Please select both a team and a user.");
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/teams/add-user`,
        {
          teamId: selectedTeamId,
          userId: selectedUserId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTeams();
      setSelectedTeamId("");
      setSelectedUserId("");
    } catch (err) {
      console.error("Error adding user to team:", err);
      setError("Failed to add user to team. User might already be in team or team/user invalid.");
    }
  };

  return (
    <div className="flex flex-col  md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        {/* Added background color to the main content area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto bg-gray-50">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-blue-800">Team Management</h2>

          {/* Loading and Error Indicators */}
          {loading && <p className="text-blue-600 text-center text-lg">Loading teams...</p>}
          {error && <p className="text-red-600 text-center text-lg font-semibold">{error}</p>}

{/* Forms Section - Stacked Responsively */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

  {/* Create Team Card */}
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-200 border">
    <h3 className="text-xl font-semibold text-blue-800 mb-4">🚀 Create New Team</h3>
    <form onSubmit={handleCreateTeam} className="space-y-4">
      <input
        type="text"
        placeholder="Team Name"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <select
        className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
        required
      >
        <option value="">Select Department</option>
        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>
            {dept.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md"
      >
        Create Team
      </button>
    </form>
  </div>

  {/* Add User to Team Card */}
  <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-200 border">
    <h3 className="text-xl font-semibold text-green-700 mb-4">👥 Add User to Team</h3>
    <div className="space-y-4">
      <select
        className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
        value={selectedTeamId}
        onChange={(e) => setSelectedTeamId(e.target.value)}
      >
        <option value="">Select Team</option>
        {teams.map((team) => (
          <option key={team._id} value={team._id}>
            {team.name}
          </option>
        ))}
      </select>

      <select
        className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name || user.email}
          </option>
        ))}
      </select>

      <button
        onClick={handleAddUser}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md"
      >
        Add User to Team
      </button>
    </div>
  </div>

</div>


          {/* List of Teams Section */}
<div className="bg-white p-4 sm:p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg">
  <h3 className="text-lg sm:text-xl font-semibold mb-6 text-gray-800">All Teams</h3>
  {loading && <p className="text-center text-gray-600">Loading teams...</p>}
  {!loading && teams.length === 0 ? (
    <p className="text-gray-600 text-center">No teams found. Create one above!</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.map((team) => (
        <div
          key={team._id}
          className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition duration-200"
        >
          <h4 className="text-xl font-bold text-blue-800 mb-2">{team.name}</h4>
          <p className="text-sm text-gray-600 mb-3">
            <span className="font-medium">Department:</span>{" "}
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-semibold">
              {team.department?.name || "N/A"}
            </span>
          </p>
          <div>
            <p className="text-sm text-gray-700 font-medium mb-1">Members:</p>
            {team.members?.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {team.members.map((m, index) => (
                  <li
                    key={index}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs"
                  >
                    {m.name || m.email}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">No members added</p>
            )}
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

export default Teams;