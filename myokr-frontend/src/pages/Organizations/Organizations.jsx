import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orgs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrganizations(res.data);
    } catch (err) {
      console.error("Error fetching organizations:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/orgs",
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setName("");
      fetchOrganizations();
    } catch (err) {
      console.error("Error creating organization:", err);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar />
        <main className="p-6 space-y-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Organization Overview</h2>

          {/* Create Organization */}
          <div className="bg-white shadow p-4 rounded">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold">Create Organization</h3>
              <input
                type="text"
                placeholder="Organization Name"
                className="w-full p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Organization
              </button>
            </form>
          </div>

          {/* List Organizations */}
          <div className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold mb-4">Existing Organizations</h3>
            {organizations.length === 0 ? (
              <p>No organizations found.</p>
            ) : (
              <ul className="space-y-2">
                {organizations.map((org) => (
                  <li key={org._id} className="border-b pb-2">
                    <strong>{org.name}</strong>
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

export default Organizations;
