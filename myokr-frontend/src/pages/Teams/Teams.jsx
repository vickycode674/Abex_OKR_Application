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

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTeams();
    fetchDepartments();
    fetchUsers();
  }, []);

  const fetchTeams = async () => {
    const res = await axios.get("http://localhost:5000/api/teams", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTeams(res.data);
  };

  const fetchDepartments = async () => {
    const res = await axios.get("http://localhost:5000/api/depts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDepartments(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/teams", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ name: "", department: "" });
      fetchTeams();
    } catch (err) {
      console.error("Error creating team:", err);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/teams/add-user",
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
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Navbar />
        <main className="p-6 space-y-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-2 text-blue-900">Team Management</h2>

          {/* Create Team */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Create Team</h3>
            <form onSubmit={handleCreateTeam} className="space-y-4">
              <input
                type="text"
                placeholder="Team Name"
                className="border p-2 rounded w-full"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <select
                className="border p-2 rounded w-full"
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
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Create
              </button>
            </form>
          </div>

          {/* Add User to Team */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Add User to Team</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <select
                className="border p-2 rounded w-full"
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
                className="border p-2 rounded w-full"
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
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>

          {/* List of Teams */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-4">All Teams</h3>
            {teams.length === 0 ? (
              <p>No teams found.</p>
            ) : (
              <ul className="space-y-4">
                {teams.map((team) => (
                  <li key={team._id} className="border-b pb-2">
                    <p className="text-lg font-bold">{team.name}</p>
                    <p className="text-sm text-gray-600">
                      Department: {team.department?.name || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Members:{" "}
                      {team.members?.length > 0
                        ? team.members.map((m) => m.name || m.email).join(", ")
                        : "No members"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Teams;
