import React from 'react';
import { UserCircleIcon, BellIcon } from '@heroicons/react/24/outline';

const EmpHeader = ({ empName = 'Employee', empId = '' }) => {
  const initials = empName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-b border-slate-100 dark:border-slate-700 px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div aria-hidden className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100/60">
            <div className="w-4 h-4 bg-indigo-500 rounded-sm rotate-12" />
          </div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">GearGuard</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-none">{empName}</p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 uppercase tracking-widest">{empId}</p>
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-100 dark:border-slate-700">
            <button
              type="button"
              aria-label="Notifications"
              title="Notifications"
              className="relative p-2 rounded-full text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <BellIcon className="h-5 w-5" />
              <span className="pointer-events-none absolute -top-1 -right-1 inline-flex items-center justify-center h-4 min-w-4 px-0.5 rounded-full bg-rose-500 text-white text-[10px] font-medium">●</span>
            </button>

            <button
              type="button"
              aria-label={`User menu for ${empName}`}
              title={empName}
              className="flex items-center gap-2 p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium">{initials}</span>
              <span className="sr-only">{empName}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EmpHeader;