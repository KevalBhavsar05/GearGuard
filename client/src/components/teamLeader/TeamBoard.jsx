export default function TeamBoard({ requests, technicians }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {technicians.map(tech => (
        <div key={tech.id} className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-sm mb-3">
            {tech.name} ({tech.tasks})
          </h3>

          <div className="space-y-2">
            {requests
              .filter(r => r.assignedTo === tech.name)
              .map(r => (
                <div
                  key={r.id}
                  className="bg-white p-2 rounded shadow text-xs"
                >
                  {r.subject}
                </div>
              ))}

            {requests.filter(r => r.assignedTo === tech.name).length === 0 && (
              <p className="text-xs text-gray-400">
                No tasks assigned
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
