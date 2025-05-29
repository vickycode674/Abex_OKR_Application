// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-md transition-colors duration-300 ${
      isActive
        ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow-lg"
        : "text-gray-300 hover:bg-purple-700 hover:text-white"
    }`;

  return (
    <div className="w-64 h-full bg-gradient-to-b from-indigo-800 via-purple-900 to-indigo-900 shadow-lg p-6 flex flex-col">
      <h2 className="text-3xl font-extrabold text-white mb-8 tracking-wide drop-shadow-lg">
        MyOKR 🚀
      </h2>
      <nav className="space-y-3 flex-1">
        <NavLink to="/dashboard" className={linkClass}>🏠 Dashboard</NavLink>
        <NavLink to="/okrs" className={linkClass}>📈 OKRs</NavLink>
        <NavLink to="/okr/create" className={linkClass}>➕ Create OKR</NavLink>
        <NavLink to="/teams" className={linkClass}>👥 Teams</NavLink>
        <NavLink to="/departments" className={linkClass}>🏢 Departments</NavLink>
        <NavLink to="/organizations" className={linkClass}>🌐 Organizations</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
