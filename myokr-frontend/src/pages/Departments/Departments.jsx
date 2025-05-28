import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [form, setForm] = useState({ name: "", organization: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDepartments();
    fetchOrganizations();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/depts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

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
        "http://localhost:5000/api/depts",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setForm({ name: "", organization: "" });
      fetchDepartments();
    } catch (err) {
      console.error("Error creating department:", err);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Navbar />
        <main className="p-6 space-y-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-blue-800">Departments</h2>

          {/* Create Department */}
          <div className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Create Department</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Department Name"
                className="w-full p-2 border rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <select
                className="w-full p-2 border rounded"
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
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Create Department
              </button>
            </form>
          </div>

          {/* List Departments */}
          <div className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold mb-4">Existing Departments</h3>
            {departments.length === 0 ? (
              <p>No departments found.</p>
            ) : (
              <ul className="space-y-3">
                {departments.map((dept) => (
                  <li key={dept._id} className="border-b pb-2">
                    <div className="text-md font-bold">{dept.name}</div>
                    <div className="text-sm text-gray-600">
                      Organization: {dept.organization?.name || "N/A"}
                    </div>
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

export default Departments;
