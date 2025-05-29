// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Index";
import ProtectedRoute from "./components/ProtectedRoute";
import OKRList from "./pages/OKRs/OKRList.jsx";
import CreateOKR from "./pages/OKRs/CreateOKR";
import Teams from "./pages/Teams/Teams";
import Departments from "./pages/Departments/Departments";
import Organizations from "./pages/Organizations/Organizations";
import EditOKR from "./pages/OKRs/EditOKR.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/okrs"
          element={<ProtectedRoute><OKRList /></ProtectedRoute>}
        />
        <Route
          path="/okr/create"
          element={<ProtectedRoute><CreateOKR /></ProtectedRoute>}
        />
        <Route
          path="/teams"
          element={<ProtectedRoute><Teams /></ProtectedRoute>}
        />
        <Route
          path="/departments"
          element={<ProtectedRoute><Departments /></ProtectedRoute>}
        />
        <Route
          path="/organizations"
          element={<ProtectedRoute><Organizations /></ProtectedRoute>}
        />
        <Route path="/okr/edit/:id" 
        element={<ProtectedRoute><EditOKR /></ProtectedRoute>}
       />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
