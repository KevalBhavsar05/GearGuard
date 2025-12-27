import React from 'react';
import { 
  SparklesIcon, 
  ArrowPathIcon, 
  CheckCircleIcon, 
  ArchiveBoxIcon 
} from '@heroicons/react/24/outline';

const stages = [
  { id: 'New', icon: SparklesIcon, color: 'text-blue-400', bg: 'bg-blue-50' },
  { id: 'In Progress', icon: ArrowPathIcon, color: 'text-amber-400', bg: 'bg-amber-50' },
  { id: 'Repaired', icon: CheckCircleIcon, color: 'text-emerald-400', bg: 'bg-emerald-50' },
  { id: 'Scrap', icon: ArchiveBoxIcon, color: 'text-rose-400', bg: 'bg-rose-50' }
];

const ComplaintProgress = ({ complaints }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {complaints.map((item) => {
        const currentStageIndex = stages.findIndex(s => s.id === item.stage);

        return (
          <div key={item.id} className="bg-white/60 p-7 rounded-[2.5rem] border border-white shadow-sm hover:shadow-indigo-100/50 transition-all duration-500">
            <div className="flex justify-between items-start mb-10">
              <div className="space-y-1">
                <h4 className="text-md font-semibold text-slate-700">{item.equipment}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{item.id}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                  <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-widest">{item.category}</span>
                </div>
              </div>
              <div className="px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100">
                 <p className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">Assigned</p>
                 <p className="text-[11px] font-medium text-slate-600">{item.technician}</p>
              </div>
            </div>

            {/* Step Tracker */}
            <div className="flex items-center justify-between relative px-2">
              {stages.map((stage, index) => {
                const Icon = stage.icon;
                const isPast = index < currentStageIndex;
                const isCurrent = index === currentStageIndex;

                return (
                  <React.Fragment key={stage.id}>
                    <div className="flex flex-col items-center z-10">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-700 ${
                        isCurrent 
                          ? `${stage.bg} ${stage.color} ring-4 ring-white shadow-sm` 
                          : isPast 
                            ? `bg-slate-700 text-white shadow-md` 
                            : 'bg-slate-50 text-slate-200 border border-slate-100/50'
                      }`}>
                        <Icon className="h-5 w-5 stroke-[1.5px]" />
                      </div>
                      <span className={`text-[8px] mt-3 font-bold uppercase tracking-[0.15em] ${
                        isCurrent ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        {stage.id}
                      </span>
                    </div>

                    {index < stages.length - 1 && (
                      <div className="flex-grow h-[1px] mb-6 bg-slate-100 relative mx-[-12px]">
                        <div 
                          className="h-full bg-slate-400 transition-all duration-1000" 
                          style={{ width: isPast ? '100%' : '0%' }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ComplaintProgress;