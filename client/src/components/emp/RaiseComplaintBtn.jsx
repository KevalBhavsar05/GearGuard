import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const RaiseComplaintBtn = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white border border-slate-100 p-10 md:p-14 rounded-[3rem] shadow-sm shadow-slate-200/40 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="max-w-md text-center md:text-left">
        <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">Raise a Complaint</h2>
        <p className="text-slate-400 mt-2 leading-relaxed">Report equipment issues to your maintenance team. We’ll keep you updated on the progress.</p>
      </div>
      
      {/* Redirection happens here */}
      <button 
        onClick={() => navigate('/raise-complaint')}
        className="flex items-center gap-3 bg-indigo-500 hover:bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-medium text-lg transition-all hover:shadow-xl hover:shadow-indigo-200 active:scale-95"
      >
        <PlusIcon className="h-6 w-6 stroke-2" />
        New Request
      </button>
    </section>
  );
};

export default RaiseComplaintBtn;