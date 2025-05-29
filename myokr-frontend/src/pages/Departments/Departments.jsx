import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [form, setForm] = useState({ name: "", organization: "" });
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null);   // Added error state

  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null; // Safely access localStorage

  // --- Data Fetching Functions ---
  const fetchDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/depts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments:", err); // Keep for debugging, but user won't see it
      setError("Failed to load departments.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orgs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrganizations(res.data);
    } catch (err) {
      console.error("Error fetching organizations:", err);
      setError("Failed to load organizations.");
    }
  };

  // --- Initial Data Load on Component Mount ---
  useEffect(() => {
    // Only fetch if token is available
    if (token) {
        fetchDepartments();
        fetchOrganizations();
    } else {
        setError("Authentication token not found. Please log in.");
        setLoading(false);
    }
  }, [token]); // Added token to dependencies

  // --- Form Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post(
        "http://localhost:5000/api/depts",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setForm({ name: "", organization: "" });
      fetchDepartments(); // Refresh departments list
    } catch (err) {
      console.error("Error creating department:", err);
      setError("Failed to create department. Please try again.");
    }
  };

return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto bg-white bg-opacity-70 backdrop-blur-sm rounded-tl-lg shadow-inner">

        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-800">🏢 Department Management</h2>

        {/* Feedback */}
        {loading && <p className="text-blue-600 text-center text-lg">Loading departments...</p>}
        {error && <p className="text-red-600 text-center text-lg font-semibold">{error}</p>}

        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Department Card */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-200 border">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">📂 Create New Department</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Department Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <select
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                required
              >
                <option value="">Select Organization</option>
                {organizations.map((org) => (
                  <option key={org._id} value={org._id}>
                    {org.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md"
              >
                Create Department
              </button>
            </form>
          </div>

          {/* Summary/Info Card (Optional) */}
          <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6 rounded-xl shadow-md border">
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">💡 Quick Tips</h3>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              <li>Create departments under the correct organization.</li>
              <li>Use consistent naming (e.g., "Engineering", "Marketing").</li>
              <li>Departments can be assigned users in the Teams section.</li>
            </ul>
          </div>
        </div>

        {/* Departments List */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🏷️ All Departments</h3>
          {loading && <p className="text-center text-gray-600">Loading departments...</p>}
          {!loading && departments.length === 0 ? (
            <p className="text-gray-600 text-center">No departments found. Create one above!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <div
                  key={dept._id}
                  className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-150"
                >
                  <p className="text-lg font-bold text-blue-900">{dept.name}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium text-gray-700">Organization:</span> {dept.organization?.name || "N/A"}
                  </p>
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

export default Departments;