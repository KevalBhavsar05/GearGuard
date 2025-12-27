import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PlusIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom'; // Import navigation hook

import EmpHeader from '../components/emp/EmpHeader';
import EmpFooter from '../components/emp/EmpFooter';
import ComplaintProgress from '../components/emp/ComplaintProgress';

const fetchRequests = async () => {
  // Mocking data based on your Mongoose Schema
  return [
    { id: 'REQ-2401', equipment: 'CNC Machine 04', category: 'Production', stage: 'In Progress', technician: 'Sarah Jen' },
    { id: 'REQ-2402', equipment: 'Conference Cam G2', category: 'Infrastructure', stage: 'New', technician: 'Unassigned' },
  ];
};

const EmployeeDashboard = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const { data: complaints, isLoading } = useQuery({
    queryKey: ['myMaintenance'],
    queryFn: fetchRequests
  });

  return (
    <div className="min-h-screen bg-[#F9FBFC] flex flex-col font-sans selection:bg-indigo-100">
      <EmpHeader empName="John Doe" empId="EMP-ID: #8821" />

      <main className="flex-grow max-w-6xl mx-auto w-full p-6 md:p-12 space-y-16">
        
        {/* Soft Hero Action Section */}
        <section className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-white shadow-sm shadow-indigo-100/30 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-md text-center md:text-left space-y-3">
            <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">Report an Issue</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Facing a breakdown? Submit a maintenance request. Our teams will be notified immediately.
            </p>
          </div>

          {/* REDIRECT BUTTON */}
          <button 
            onClick={() => navigate('/raise-complaint')} // Navigation trigger
            className="group flex items-center gap-3 bg-indigo-500 hover:bg-indigo-600 text-white px-10 py-5 rounded-[2.5rem] font-semibold text-lg transition-all hover:shadow-2xl hover:shadow-indigo-200 active:scale-95"
          >
            <PlusIcon className="h-6 w-6 stroke-[2.5px] group-hover:rotate-90 transition-transform duration-300" />
            New Complaint
          </button>
        </section>

        {/* Status Tracker Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <ChartBarIcon className="w-4 h-4 text-indigo-300" />
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Live Progress Stat</h3>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="h-64 bg-white/50 border border-white rounded-[2.5rem] animate-pulse" />
               <div className="h-64 bg-white/50 border border-white rounded-[2.5rem] animate-pulse" />
            </div>
          ) : (
            <ComplaintProgress complaints={complaints || []} />
          )}
        </div>
      </main>

      <EmpFooter />
    </div>
  );
};

export default EmployeeDashboard;