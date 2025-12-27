import { useState } from "react";
import TeamLeaderHeader from "../components/teamLeader/TeamLeaderHeader";
import TeamLeaderTabs from "../components/teamLeader/TeamLeaderTabs";
import TeamBoard from "../components/teamLeader/TeamBoard";
import AssignTasks from "../components/teamLeader/AssignTasks";
import TeamLeaderFooter from "../components/teamLeader/TeamLeaderFooter";

const initialRequests = [
  { id: "REQ-1", subject: "Printer not working", assignedTo: "Rahul" },
  { id: "REQ-2", subject: "Oil leakage", assignedTo: "Amit" },
  { id: "REQ-3", subject: "System check", assignedTo: null }
];

const initialTechnicians = [
  { id: 1, name: "Rahul", tasks: 1 },
  { id: 2, name: "Amit", tasks: 1 },
  { id: 3, name: "Suresh", tasks: 0 }
];

export default function TeamLeaderDashboard() {
  const [activeTab, setActiveTab] = useState("My Work");
  const [requests, setRequests] = useState(initialRequests);
  const [technicians, setTechnicians] = useState(initialTechnicians);

  const unassignedRequests = requests.filter(r => !r.assignedTo);

  const handleAssign = (techName) => {
    const unassigned = requests.find(r => !r.assignedTo);
    if (!unassigned) return;

    setRequests(prev =>
      prev.map(r =>
        r.id === unassigned.id
          ? { ...r, assignedTo: techName }
          : r
      )
    );

    setTechnicians(prev =>
      prev.map(t =>
        t.name === techName
          ? { ...t, tasks: t.tasks + 1 }
          : t
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <TeamLeaderHeader />

      <main className="flex-1 p-6 space-y-6">
        <TeamLeaderTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {activeTab === "My Work" && (
          <TeamBoard
            requests={requests.filter(r => r.assignedTo === "Rahul")}
            technicians={[technicians[0]]}
          />
        )}

        {activeTab === "Team Board" && (
          <TeamBoard
            requests={requests}
            technicians={technicians}
          />
        )}

        {activeTab === "Assign Tasks" && (
          <AssignTasks
            unassignedRequests={unassignedRequests}
            technicians={technicians}
            onAssign={handleAssign}
          />
        )}
      </main>

      <TeamLeaderFooter />
    </div>
  );
}
