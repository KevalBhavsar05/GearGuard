import React from 'react';
import Navbar from '../components/manager/Navbar';
import Dashboard from '../components/manager/Dashboard';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-[1600px] mx-auto">
        <Dashboard />
      </main>
    </div>
  );
};

export default AdminDashboard;