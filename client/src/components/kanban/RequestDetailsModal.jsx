export default function RequestDetailsModal({ request, onClose }) {
  if (!request) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-3">
          {request.subject}
        </h2>

        <div className="space-y-1 text-sm">
          <p><b>Stage:</b> {request.stage}</p>
          <p><b>Type:</b> {request.type}</p>
          <p><b>Equipment:</b> {request.equipment}</p>
          <p><b>Department:</b> {request.department}</p>
          <p><b>Team:</b> {request.team}</p>
          <p>
            <b>Scheduled:</b>{" "}
            {request.scheduledDate
              ? new Date(request.scheduledDate).toLocaleString()
              : "N/A"}
          </p>
          <p><b>Duration:</b> {request.duration} hrs</p>
        </div>

        <p className="mt-3 text-sm">
          <b>Notes:</b> {request.notes}
        </p>

        <button
          onClick={onClose}
          className="mt-5 px-4 py-2 bg-gray-800 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
