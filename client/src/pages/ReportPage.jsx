import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  DocumentChartBarIcon, 
  ArrowDownTrayIcon, 
  CheckBadgeIcon, 
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// --- MOCK DATA FOR THE REPORT ---
const ASSET_DISTRIBUTION = [
  { name: 'Monitors', value: 45 },
  { name: 'Laptops', value: 30 },
  { name: 'Printers', value: 15 },
  { name: 'Servers', value: 10 },
];

const TASK_COMPLETION_DATA = [
  { month: 'July', completed: 12, pending: 5 },
  { month: 'Aug', completed: 19, pending: 3 },
  { month: 'Sept', completed: 15, pending: 8 },
  { month: 'Oct', completed: 22, pending: 2 },
  { month: 'Nov', completed: 30, pending: 4 },
  { month: 'Dec', completed: 28, pending: 6 },
];

const MAINTENANCE_COSTS = [
  { day: 'Mon', cost: 400 },
  { day: 'Tue', cost: 700 },
  { day: 'Wed', cost: 500 },
  { day: 'Thu', cost: 900 },
  { day: 'Fri', cost: 1200 },
];

const COLORS = ['#2563eb', '#7c3aed', '#db2777', '#f59e0b'];

const ReportPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <DocumentChartBarIcon className="w-10 h-10 text-blue-600" />
              Final Analytics Report
            </h1>
            <p className="text-slate-500 mt-1">Comprehensive overview of assets, maintenance, and task performance.</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <ArrowDownTrayIcon className="w-5 h-5" />
            Export PDF Report
          </button>
        </div>

        {/* TOP STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Assets" value="124" trend="+12%" icon={<CheckBadgeIcon className="text-blue-600"/>} bg="bg-blue-50" />
          <StatCard title="Tasks Completed" value="89%" trend="+5.4%" icon={<CheckBadgeIcon className="text-green-600"/>} bg="bg-green-50" />
          <StatCard title="Pending Repairs" value="14" trend="-2" icon={<ClockIcon className="text-amber-600"/>} bg="bg-amber-50" />
          <StatCard title="Critical Alerts" value="03" trend="High" icon={<ExclamationTriangleIcon className="text-red-600"/>} bg="bg-red-50" />
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Bar Chart: Task Completion */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Task Completion Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TASK_COMPLETION_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Legend iconType="circle" />
                  <Bar dataKey="completed" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={30} />
                  <Bar dataKey="pending" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart: Asset Distribution */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Asset Category Breakdown</h3>
            <div className="h-80 flex flex-col md:flex-row items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ASSET_DISTRIBUTION}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {ASSET_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-full md:w-1/3 flex flex-col gap-3">
                {ASSET_DISTRIBUTION.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[idx]}}></div>
                      <span className="text-sm text-slate-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-800">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: AREA CHART & DATA TABLE */}
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
             <h3 className="text-lg font-bold text-slate-800 mb-6">Maintenance Expenditure ($)</h3>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MAINTENANCE_COSTS}>
                    <defs>
                      <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" hide />
                    <Tooltip />
                    <Area type="monotone" dataKey="cost" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorCost)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, trend, icon, bg }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${bg}`}>
        {React.cloneElement(icon, { className: 'w-6 h-6' })}
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${trend.includes('+') ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
        {trend}
      </span>
    </div>
    <h4 className="text-slate-500 text-sm font-medium">{title}</h4>
    <p className="text-2xl font-black text-slate-800 mt-1">{value}</p>
  </div>
);

export default ReportPage;