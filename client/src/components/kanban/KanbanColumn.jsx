import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";

export default function KanbanColumn({ stage, requests, onCardClick }) {
  const { setNodeRef } = useDroppable({ id: stage.id });

  return (
    <div ref={setNodeRef} className="bg-gray-50 rounded-lg p-4 min-h-[480px]">
      <h2 className="font-semibold mb-4">{stage.title}</h2>

      <div className="space-y-3">
        {requests.length === 0 && (
          <p className="text-xs text-gray-400">No jobs here</p>
        )}

        {requests.map(req => (
          <KanbanCard
  key={req.id}
  request={req}
  onClick={() => onCardClick(req)}
/>

        ))}
      </div>
    </div>
  );
}
