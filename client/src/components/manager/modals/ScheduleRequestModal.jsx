import React from 'react';
import { X } from 'lucide-react';

const ScheduleRequestModal = ({ date, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Schedule Checkup</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1"><X size={24} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Scheduled Date</label>
            <input type="text" disabled value={date} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-slate-500" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Select Equipment</label>
            <select className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Select Machine/Asset...</option>
              <option>CNC Machine 01 (Production)</option>
              <option>HP Printer 02 (Office)</option>
            </select>
            <p className="text-[10px] text-slate-400 mt-1 italic font-medium">Team and Technician will be auto-filled based on selection.</p>
          </div>
          <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            Confirm Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleRequestModal;