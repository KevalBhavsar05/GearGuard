import React from 'react';
import { Filter } from 'lucide-react';

const CalendarFilters = () => {
  const teams = ['All Teams', 'Mechanics', 'Electricians', 'IT Support'];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
      <div className="flex items-center gap-2 text-slate-800 font-bold border-b pb-4">
        <Filter size={18} />
        Filter Visibility
      </div>
      <div className="space-y-2">
        {teams.map(team => (
          <label key={team} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm font-medium text-slate-600">{team}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CalendarFilters;