import { useState } from "react";
import TechnicianHeader from "../components/technician/TechnicianHeader";
import TechnicianFooter from "../components/technician/TechnicianFooter";
import TechnicianFocusBar from "../components/technician/TechnicianFocusBar";
import KanbanBoard from "../components/kanban/KanbanBoard";

const initialRequests = [
  {
    id: "REQ-1",
    subject: "Printer not working",
    equipment: "Printer 01",
    priority: "High",
    type: "Corrective",
    stage: "NEW"
  },
  {
    id: "REQ-2",
    subject: "Oil leakage",
    equipment: "CNC Machine",
    priority: "Medium",
    type: "Corrective",
    stage: "IN_PROGRESS"
  },
  {
    id: "REQ-3",
    subject: "Weekly system check",
    equipment: "Office PC",
    priority: "Low",
    type: "Preventive",
    stage: "REPAIRED"
  }
];

export default function TechnicianDashboard() {
  const [requests, setRequests] = useState(initialRequests);

  const stats = {
    today: new Date().toDateString(),
    overdue: 1,
    assigned: requests.length,
    preventive: requests.filter(r => r.type === "Preventive").length
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <TechnicianHeader />

      <main className="flex-1 p-6 space-y-6">
        <TechnicianFocusBar stats={stats} />

        <KanbanBoard
          requests={requests}
          setRequests={setRequests}
        />
      </main>

      <TechnicianFooter />
    </div>
  );
}
