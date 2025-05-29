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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orgs`, {
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
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-10 space-y-10">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-gray-800">
                🏢 Organization Overview
              </h2>
              <p className="text-gray-600 mt-2">
                Create and manage your organizations.
              </p>
            </div>

            {/* Create Organization Form */}
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
              <h3 className="text-2xl font-bold mb-6 text-blue-800">
                ➕ Create New Organization
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter organization name"
                  className="w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out shadow-sm"
                >
                  Add Organization
                </button>
              </form>
            </div>

            {/* Organization List */}
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
              <h3 className="text-2xl font-bold mb-6 text-green-800">
                📋 Existing Organizations
              </h3>
              {organizations.length === 0 ? (
                <p className="text-gray-500">No organizations found.</p>
              ) : (
                <ul className="space-y-3">
                  {organizations.map((org) => (
                    <li
                      key={org._id}
                      className="bg-gray-100 p-4 rounded-lg border border-gray-300 shadow-sm"
                    >
                      <span className="font-semibold text-gray-800">
                        {org.name}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Organizations;
