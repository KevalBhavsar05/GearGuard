import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, Box, BarChart2, FileText } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  // Helper function to set active styles
  // active when exact or nested route matches
  const isActive = (path) => {
    if (!path) return false;
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path + '/') || location.pathname.startsWith(path);
  };

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinkClass = (path) => `
    transition-all duration-200 pb-1 font-semibold text-sm
    ${isActive(path) 
      ? 'text-blue-600 border-b-2 border-blue-600' 
      : 'text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-300'
    }
  `;

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-8">
        {/* Brand Logo - Redirects to Admin Dashboard */}
        <Link to="/admin/dashboard" className="text-xl font-black text-blue-600 tracking-tighter italic">
          GEARGUARD
        </Link>

        {/* Navigation Links (desktop) */}
        <div className="hidden md:flex gap-8">
          <Link to="/admin/dashboard" className={navLinkClass('/admin/dashboard')}>
            Dashboard
          </Link>

          <Link to="/maintenance-calendar" className={navLinkClass('/maintenance-calendar')}>
            Maintenance Calendar
          </Link>

          <Link to="/equipment" className={navLinkClass('/equipment')}>
            Equipment
          </Link>

          <Link to="/reporting" className={navLinkClass('/reporting')}>
            Reporting
          </Link>
        </div>

        {/* Mobile toggle is now on the right side (next to avatar) */}
      </div>

      {/* User Profile Section */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-gray-800">Admin User</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Manager</p>
        </div>
        {/* Mobile toggle (right side) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileOpen((s) => !s)}
            aria-label="Toggle menu"
            className="p-2 rounded-md bg-white/0 hover:bg-slate-100"
          >
            {isMobileOpen ? <X className="w-6 h-6 text-slate-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
          </button>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-xs shadow-inner">
          AD
        </div>
      </div>
      </nav>

      {/* Mobile overlay menu */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setIsMobileOpen(false)}>
          <div className="absolute right-0 top-0 w-64 h-full bg-white shadow-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <Link to="/admin/dashboard" onClick={() => setIsMobileOpen(false)} className="text-lg font-bold text-blue-600">GEARGUARD</Link>
              <button onClick={() => setIsMobileOpen(false)} aria-label="Close" className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              <Link to="/admin/dashboard" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-100">
                <BarChart2 className="w-5 h-5 text-slate-700" />
                <span className={navLinkClass('/admin/dashboard')}>Dashboard</span>
              </Link>

              <Link to="/maintenance-calendar" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-100">
                <Calendar className="w-5 h-5 text-slate-700" />
                <span className={navLinkClass('/maintenance-calendar')}>Maintenance Calendar</span>
              </Link>

              <Link to="/equipment" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-100">
                <Box className="w-5 h-5 text-slate-700" />
                <span className={navLinkClass('/equipment')}>Equipment</span>
              </Link>

              <Link to="/reporting" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-100">
                <FileText className="w-5 h-5 text-slate-700" />
                <span className={navLinkClass('/reporting')}>Reporting</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;