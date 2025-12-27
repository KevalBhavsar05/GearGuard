import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

// Providers & Context
import { AppProvider } from "./contexts/AppContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import TechnicianDashboard from "./pages/TechnicianDashboard";
import TeamLeaderDashboard from "./pages/TeamLeaderDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

// NEW: The Complaint Page
import RaiseComplaintPage from "./pages/RaiseComplaintPage.jsx";
import MaintenanceCalendar from "./pages/MaintenanceCalendar.jsx";
import AdminRoutes from "./routes/AdminRoutes";

// Initialize TanStack Query Client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Soft Notification System */}
        <Toaster richColors position="top-right" />

        <Routes>
          {/* Public & Role-Based Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/technician" element={<TechnicianDashboard />} />
          <Route path="/team-leader" element={<TeamLeaderDashboard />} />

          {/* EMPLOYEE FLOW - This fixes your "/raise-complaint" error */}

          <Route
            path="/maintenance-calendar"
            element={<MaintenanceCalendar />}
          />

          {/* Protected routes wrapped in AppProvider */}
          <Route
            element={
              <AppProvider>
                <ProtectedRoute allowedRoles={["USER"]} />
              </AppProvider>
            }
          >
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/raise-complaint" element={<RaiseComplaintPage />} />
          </Route>

          {/* Admin */}
          <Route
            element={
              <AppProvider>
                <ProtectedRoute allowedRoles={["ADMIN"]} />
              </AppProvider>
            }
          >
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
