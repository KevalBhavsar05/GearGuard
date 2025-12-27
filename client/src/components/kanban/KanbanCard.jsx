import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

export default function KanbanCard({ request, onClick }) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id: request.id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className="bg-white border-l-4 rounded-md p-3 shadow cursor-pointer"
    >
      {/* 🔹 DRAG HANDLE */}
      <div
        {...listeners}
        {...attributes}
        onClick={(e) => e.stopPropagation()} // ⛔ prevent modal
        className="cursor-grab text-gray-400 float-right"
      >
        <GripVertical size={16} />
      </div>

      <h3 className="font-medium text-sm">{request.subject}</h3>

      <p className="text-xs text-gray-500">
        {request.equipment}
      </p>

      <div className="flex justify-between mt-2 text-xs">
        <span>Priority: {request.priority}</span>
        <span
          className={`px-2 py-0.5 rounded text-white ${
            request.type === "Preventive"
              ? "bg-blue-500"
              : "bg-orange-500"
          }`}
        >
          {request.type}
        </span>
      </div>
    </div>
  );
}
