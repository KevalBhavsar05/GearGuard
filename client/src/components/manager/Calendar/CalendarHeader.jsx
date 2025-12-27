import React from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';

const CalendarHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
          <CalendarIcon size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Routine Checkups</h1>
          <p className="text-slate-500 text-sm">Schedule and track preventive maintenance</p>
        </div>
      </div>
      <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95">
        <Plus size={20} />
        Schedule Request
      </button>
    </div>
  );
};

export default CalendarHeader;