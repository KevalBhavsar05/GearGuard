import React from 'react';
import CalendarHeader from '../components/manager/Calendar/CalendarHeader';
import CalendarView from '../components/manager/Calendar/CalendarView';
import CalendarFilters from '../components/manager/Calendar/CalendarFilters';

const MaintenanceCalendar = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <CalendarHeader />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <CalendarFilters />
          </div>
          <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <CalendarView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceCalendar;