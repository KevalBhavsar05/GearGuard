// src/components/manager/StatsCards.jsx
export default function StatsCards({ title, value, color, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white p-6 rounded-xl shadow-sm border-l-8 ${color} cursor-pointer hover:shadow-md transition-all active:scale-95`}
    >
      <p className="text-gray-500 font-bold uppercase tracking-tight text-xs">{title}</p>
      <p className="text-3xl font-black mt-2 text-slate-800">{value} <span className="text-sm font-normal text-slate-400">Tickets</span></p>
    </div>
  );
}