import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import Notes from "../pages/Notes";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout routes */}
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
