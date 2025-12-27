export default function TeamLeaderHeader() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-lg font-semibold">
          Technician Team Leader Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Rahul Sharma • Electrical Team • Team Leader
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          On Duty
        </span>
        <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">
          End Shift
        </button>
      </div>
    </header>
  );
}
