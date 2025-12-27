

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MaintenanceDashboard() {
    const dummyDashboardData = {
  totalRequests: 24,
  overdueRequests: 3,

  statusWise: [
    { _id: "New", count: 6 },
    { _id: "In Progress", count: 8 },
    { _id: "Repaired", count: 7 },
    { _id: "Scrap", count: 3 },
  ],

  technicianWise: [
    { _id: "tech1", count: 10 },
    { _id: "tech2", count: 8 },
    { _id: "tech3", count: 6 },
  ],

  recentRequests: [
    {
      _id: "1",
      subject: "Oil Leakage",
      equipment_id: { name: "CNC Machine 01" },
      technician_id: { name: "Rahul" },
      stage: "In Progress",
    },
    {
      _id: "2",
      subject: "Printer Not Working",
      equipment_id: { name: "HP Printer 02" },
      technician_id: { name: "Amit" },
      stage: "New",
    },
    {
      _id: "3",
      subject: "System Overheating",
      equipment_id: { name: "Office PC 12" },
      technician_id: { name: "Neha" },
      stage: "Repaired",
    },
    {
      _id: "4",
      subject: "Motor Burnt",
      equipment_id: { name: "Conveyor Motor" },
      technician_id: null,
      stage: "Scrap",
    },
  ],
};

  const [data, setData] = useState(null);

 useEffect(() => {
  // TEMP: using dummy data
  setData(dummyDashboardData);

  // UNCOMMENT WHEN BACKEND IS READY
  // axios
  //   .get("/api/maintenance/dashboard")
  //   .then((res) => setData(res.data))
  //   .catch(console.error);
}, []);

  if (!data) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-6">

      {/* ===== KPI CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Total Requests" value={data.totalRequests} />
        <KpiCard title="Overdue" value={data.overdueRequests} danger />
        <KpiCard
          title="In Progress"
          value={getCount(data.statusWise, "In Progress")}
        />
        <KpiCard
          title="New Requests"
          value={getCount(data.statusWise, "New")}
        />
      </div>

      {/* ===== CHART + TECHNICIAN LOAD ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Requests by Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.statusWise}>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technician Workload</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.technicianWise.map((t, i) => (
                <li
                  key={i}
                  className="flex justify-between border-b pb-2 text-sm"
                >
                  <span>Technician</span>
                  <span className="font-medium">{t.count}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* ===== RECENT REQUESTS ===== */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Maintenance Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.recentRequests.map((req) => (
                <TableRow key={req._id}>
                  <TableCell>{req.subject}</TableCell>
                  <TableCell>{req.equipment_id?.name}</TableCell>
                  <TableCell>
                    {req.technician_id?.name || "Unassigned"}
                  </TableCell>
                  <TableCell>
                    <StageBadge stage={req.stage} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

/* ================= HELPERS ================= */

function KpiCard({ title, value, danger }) {
  return (
    <Card
      className={
        danger
          ? "border-l-4 border-red-500"
          : "border-l-4 border-primary"
      }
    >
      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function StageBadge({ stage }) {
  const variant =
    stage === "Repaired"
      ? "success"
      : stage === "In Progress"
      ? "default"
      : stage === "Scrap"
      ? "destructive"
      : "secondary";

  return <Badge variant={variant}>{stage}</Badge>;
}

const getCount = (data, stage) =>
  data.find((d) => d._id === stage)?.count || 0;
