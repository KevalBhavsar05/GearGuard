import { DndContext } from "@dnd-kit/core";
import { STAGES } from "../../utils/stages";
import KanbanColumn from "./KanbanColumn";

export default function KanbanBoard({ requests, setRequests }) {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    setRequests(prev =>
      prev.map(req =>
        req.id === active.id
          ? { ...req, stage: over.id }
          : req
      )
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {STAGES.map(stage => (
          <KanbanColumn
            key={stage.id}
            stage={stage}
            requests={requests.filter(r => r.stage === stage.id)}
          />
        ))}
      </div>
    </DndContext>
  );
}
