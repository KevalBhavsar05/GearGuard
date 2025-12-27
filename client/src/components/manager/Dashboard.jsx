// src/components/manager/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import QuickAlerts from "./QuickAlerts";
import StatsCards from "./StatsCards";
import ComplaintTable from "./ComplaintTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";

export default function MaintenanceDashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { user } = useApp();
  const dummyDashboardData = {
    totalRequests: 24,
    totalCompanies: 78, // Added per mockup requirement
    overdueRequests: 3,
    statusWise: [
      { id: "New", count: 35, color: "border-blue-500" },
      { id: "In Progress", count: 128, color: "border-orange-500" },
      { id: "Repaired", count: 450, color: "border-green-500" },
      { id: "Scrap", count: 450, color: "border-slate-500" },
    ],
    recentRequests: [
      {
        id: "1",
        subject: "Email sync issue",
        employee: "Mitchell Admin",
        technician: "Alex Foster",
        stage: "New",
        company: "New Request",
      },
      {
        id: "2",
        subject: "Printer malfunction",
        employee: "Jane Doe",
        technician: "Software",
        stage: "In Progress",
        company: "Mi Lee",
      },
      {
        id: "3",
        subject: "Priath Lee Lee",
        employee: "John Smith",
        technician: "David Kim",
        stage: "Repaired",
        company: "Gamma Ltd",
      },
    ],
  };

  useEffect(() => {
    setData(dummyDashboardData);
  }, []);

  if (!data) return <p className="p-6">Loading GearGuard Dashboard...</p>;

  return (
    <div className="p-6 space-y-8 bg-slate-50 min-h-screen">
      {/* 1. TOP ALERTS (Critical, Tech Load, Open) */}
      <QuickAlerts overdue={data.overdueRequests} />

      {/* 2. STATUS CARDS (New | In Progress | Repaired | Scrap) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {data.statusWise.map((status) => (
          <StatsCards
            key={status.id}
            title={status.id}
            value={status.count}
            color={status.color}
            onClick={() => navigate(`/tickets?stage=${status.id}`)}
          />
        ))}
      </div>

      {/* 3. TOTAL COMPANIES METRIC */}
      <div className="text-2xl font-bold text-slate-800">
        Total Companies: {data.totalCompanies}
      </div>

      {/* 4. COMPLAINT TABLE */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="bg-white border-b border-slate-100">
          <CardTitle className="text-lg">Recent Maintenance Requests</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ComplaintTable tickets={data.recentRequests} />
        </CardContent>
      </Card>
    </div>
  );
}
