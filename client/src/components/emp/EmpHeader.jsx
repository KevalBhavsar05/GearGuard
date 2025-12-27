import React from 'react';
import { UserCircleIcon, BellIcon } from '@heroicons/react/24/outline';
import { Loader } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useLogout } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const EmpHeader = ({ empName = 'Employee', empId = '' }) => {
  const initials = empName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const navigate = useNavigate();
  const logout = useLogout();
  const queryClient = useQueryClient();
  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        queryClient.clear();
        toast.success("Logged out successfully.");
        navigate("/login", { replace: true });
      }
    });
  }
  if (logout.isPending) {
    return <div
      className='flex items-center justify-center min-h-full]'><Loader /></div>
  }
  return (
    <header className="sticky top-0 z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-b border-slate-100 dark:border-slate-700 px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            aria-hidden
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100/60"
          >
            <div className="w-4 h-4 bg-indigo-500 rounded-sm rotate-12" />
          </div>
          <h1 onClick={() => navigate("/")} className="text-lg font-semibold cursor-pointer text-slate-900 dark:text-slate-100 tracking-tight">
            GearGuard
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-none">
              {empName}
            </p>
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-100 dark:border-slate-700">
            <button
              type="button"
              aria-label={`User menu for ${empName}`}
              title={empName}
              className="flex items-center gap-2 p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium">
                {initials}
              </span>
              <span className="sr-only">{empName}</span>
            </button>
            <button
              type="button"
              className="text-sm cursor-pointer font-medium bg-red-100 px-4 py-2 rounded-2xl text-rose-500 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-300 rounded"
              onClick={handleLogout}
            >Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EmpHeader;
