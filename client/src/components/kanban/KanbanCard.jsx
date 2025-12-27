import { useDraggable } from "@dnd-kit/core";

export default function KanbanCard({ request }) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id: request.id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined
  };

  const priorityColor = {
    High: "border-red-500",
    Medium: "border-yellow-500",
    Low: "border-green-500"
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white border-l-4 ${priorityColor[request.priority]}
        rounded-md p-3 shadow cursor-grab`}
    >
      <h3 className="font-medium text-sm">
        {request.subject}
      </h3>

      <p className="text-xs text-gray-500">
        {request.equipment}
      </p>

      <div className="flex justify-between mt-2 text-xs">
        <span className="text-gray-400">
          Priority: {request.priority}
        </span>

        <span className={`px-2 py-0.5 rounded text-white
          ${request.type === "Preventive"
            ? "bg-blue-500"
            : "bg-orange-500"}`}>
          {request.type}
        </span>
      </div>
    </div>
  );
}
