import React from 'react';
import { useNavigate } from 'react-router-dom';

const ComplaintTable = ({ tickets }) => {
  const navigate = useNavigate();

  const handleAssign = (e, ticketId) => {
    // Prevent the row click event (redirection) from firing when clicking the button
    e.stopPropagation();
    console.log(`Assigning ticket ${ticketId} to a team`);
    // Logic to open an assignment modal or call an API would go here
    alert(`Redirecting to Assignment for Ticket #${ticketId}`);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 text-sm font-bold text-slate-600">Subject</th>
            <th className="px-6 py-4 text-sm font-bold text-slate-600">Employee</th>
            <th className="px-6 py-4 text-sm font-bold text-slate-600">Technician</th>
            <th className="px-6 py-4 text-sm font-bold text-slate-600">Stage</th>
            <th className="px-6 py-4 text-sm font-bold text-slate-600">Company</th>
            {/* Added Purpose Column Header */}
            <th className="px-6 py-4 text-sm font-bold text-slate-600 text-center">Purpose</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {tickets.map((ticket) => (
            <tr 
              key={ticket.id} 
              onClick={() => navigate(`/ticket-details/${ticket.id}`)}
              className="hover:bg-blue-50 cursor-pointer transition-colors group"
            >
              <td className="px-6 py-4 font-semibold text-slate-800 group-hover:text-blue-600">
                {ticket.subject}
              </td>
              <td className="px-6 py-4 text-slate-600">{ticket.employee}</td>
              <td className="px-6 py-4 text-slate-600">{ticket.technician || 'Unassigned'}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                  ticket.stage === 'New' ? 'bg-blue-100 text-blue-700' : 
                  ticket.stage === 'In Progress' ? 'bg-orange-100 text-orange-700' : 
                  ticket.stage === 'Repaired' ? 'bg-green-100 text-green-700' : 
                  'bg-slate-100 text-slate-600'
                }`}>
                  {ticket.stage}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-500">{ticket.company}</td>
              
              {/* Added Purpose Column with Conditional Assign Button */}
              <td className="px-6 py-4 text-center">
                {ticket.stage === 'New' ? (
                  <button
                    onClick={(e) => handleAssign(e, ticket.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-md transition-all shadow-sm active:scale-95"
                  >
                    Assign Task
                  </button>
                ) : (
                  <span className="text-slate-400 text-xs italic">Assigned</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;