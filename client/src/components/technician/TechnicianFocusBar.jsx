export default function TechnicianFocusBar({ stats }) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-md p-4 flex flex-wrap gap-6 text-sm">
      <span>📅 Today: {stats.today}</span>
      <span className="text-red-600">🔴 Overdue: {stats.overdue}</span>
      <span>🛠 Assigned: {stats.assigned}</span>
      <span>🔄 Preventive: {stats.preventive}</span>
    </div>
  );
}
