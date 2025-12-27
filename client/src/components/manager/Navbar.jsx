import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Helper function to set active styles
  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) => `
    transition-all duration-200 pb-1 font-semibold text-sm
    ${isActive(path) 
      ? 'text-blue-600 border-b-2 border-blue-600' 
      : 'text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-300'
    }
  `;

  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-8">
        {/* Brand Logo - Redirects to Dashboard */}
        <Link to="/" className="text-xl font-black text-blue-600 tracking-tighter italic">
          GEARGUARD
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8">
          <Link to="/" className={navLinkClass('/')}>
            Dashboard
          </Link>
          
          {/* Fulfills requirement: Redirect to Calendar page */}
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
      </div>

      {/* User Profile Section */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-gray-800">Admin User</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Manager</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-xs shadow-inner">
          AD
        </div>
      </div>
    </nav>
  );
};

export default Navbar;