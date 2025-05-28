// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-blue-100 ${
      isActive ? "bg-blue-200 font-semibold" : ""
    }`;

  return (
    <div className="w-64 h-full bg-white shadow p-4">
      <h2 className="text-xl font-bold mb-4">MyOKR</h2>
      <nav className="space-y-2">
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
