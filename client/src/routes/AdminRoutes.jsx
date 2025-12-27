import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AppProvider } from "../contexts/AppContext";
import Dashboard from "@/pages/Dashboard";
import AdminDashboard from "@/pages/AdminDashboard";

// Layout
export default function AdminRoutes() {
  return (
    <AppProvider>
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <Routes>
          {/* Admin-specific routes can be added here */}
          <Route path="/" element={<AdminDashboard />} />
        </Routes>
      </ProtectedRoute>
    </AppProvider>
  );
}
