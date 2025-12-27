import React from 'react';
import { AlertCircle, Activity, ClipboardCheck } from 'lucide-react';

const QuickAlerts = () => {
  const alerts = [
    { title: "Critical Equipment", desc: "5 Units (Health < 30%)", icon: <AlertCircle />, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
    { title: "Technician Load", desc: "85% Utilized (Assign Carefully)", icon: <Activity />, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
    { title: "Open Requests", desc: "12 Pending | 3 Overdue", icon: <ClipboardCheck />, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {alerts.map((alert, i) => (
        <div key={i} className={`${alert.bg} ${alert.border} border p-6 rounded-2xl flex items-start gap-4 transition-transform hover:scale-[1.02]`}>
          <div className={`${alert.color}`}>{alert.icon}</div>
          <div>
            <p className={`font-bold ${alert.color}`}>{alert.title}</p>
            <p className="text-sm text-gray-600 font-medium">{alert.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickAlerts;