export default function AssignTasks({
  unassignedRequests,
  technicians,
  onAssign
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Unassigned Complaints */}
      <div>
        <h3 className="font-semibold mb-3">
          Unassigned Complaints
        </h3>

        {unassignedRequests.map(req => (
          <div
            key={req.id}
            className="bg-white p-3 rounded shadow mb-2 text-sm"
          >
            {req.subject}
          </div>
        ))}

        {unassignedRequests.length === 0 && (
          <p className="text-xs text-gray-400">
            No unassigned complaints
          </p>
        )}
      </div>

      {/* Team Members */}
      <div>
        <h3 className="font-semibold mb-3">
          Assign to Team Member
        </h3>

        {technicians.map(tech => (
          <button
            key={tech.id}
            onClick={() => onAssign(tech.name)}
            className="block w-full text-left bg-blue-50 hover:bg-blue-100 p-2 rounded mb-2 text-sm"
          >
            {tech.name} ({tech.tasks} active tasks)
          </button>
        ))}
      </div>
    </div>
  );
}
