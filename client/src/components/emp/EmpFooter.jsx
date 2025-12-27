import React from 'react';

const EmpFooter = () => (
  <footer className="bg-transparent py-10 px-8 mt-auto border-t border-slate-100">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
      <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">© 2025 GearGuard Tracking</p>
      <div className="flex gap-8">
        {['Support', 'Reports', 'Settings'].map((link) => (
          <a key={link} href="#" className="text-[11px] font-bold text-slate-400 hover:text-indigo-400 transition-colors uppercase tracking-widest">
            {link}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default EmpFooter;