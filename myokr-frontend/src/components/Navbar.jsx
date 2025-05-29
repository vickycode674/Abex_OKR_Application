// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md px-6 py-4 flex justify-between items-center w-full z-50">
      <h1 className="text-xl md:text-2xl font-bold">🚀 MyOKR Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-white text-red-600 px-4 py-2 rounded-md shadow hover:bg-gray-100 hover:text-red-700 transition duration-200 font-medium"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
