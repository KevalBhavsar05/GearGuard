import { useEffect, useState } from "react";
import TechnicianHeader from "../components/technician/TechnicianHeader";
import TechnicianFooter from "../components/technician/TechnicianFooter";
import TechnicianFocusBar from "../components/technician/TechnicianFocusBar";
import KanbanBoard from "../components/kanban/KanbanBoard";
import { useFetchTechnicianEquipmentByStage } from "@/hooks/useFetchTechnicianEquipmentByStage";
import RequestDetailsModal from "@/components/kanban/RequestDetailsModal";


export default function TechnicianDashboard() {
  const { data } = useFetchTechnicianEquipmentByStage();

  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

 useEffect(() => {
  if (!data?.data) return;

  const formatted = data.data.flatMap(group =>
    group.requests.map(req => ({
      id: req._id,
      subject: req.subject,
      type: req.request_type,
      stage: group._id.toUpperCase().replace(" ", "_"),

      equipment: req.equipment_id?.name || "N/A",
      department: req.department_id?.name || "N/A",
      team: req.maintenance_team_id?.name || "N/A",

      scheduledDate: req.scheduled_date,
      duration: req.duration_hours,
      notes: req.notes || "—",
    }))
  );

  setRequests(formatted);
}, [data]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <TechnicianHeader />

      <main className="flex-1 p-6 space-y-6">
        <TechnicianFocusBar
          stats={{
            today: new Date().toDateString(),
            overdue: 0,
            assigned: requests.length,
            preventive: requests.filter(r => r.type === "Preventive").length
          }}
        />

        <KanbanBoard
          requests={requests}
          setRequests={setRequests}
          onCardClick={setSelectedRequest}
        />
      </main>

      <TechnicianFooter />

      {/* 🔥 DETAILS MODAL */}
      {selectedRequest && (
  <RequestDetailsModal
    request={selectedRequest}
    onClose={() => setSelectedRequest(null)}
  />
)}

    </div>
  );
}
