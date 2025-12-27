import React from 'react';

const EventItem = ({ eventInfo }) => {
  const { team, status } = eventInfo.event.extendedProps;
  
  return (
    <div className={`p-1 w-full rounded border-l-4 shadow-sm text-xs truncate
      ${status === 'New' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-orange-50 border-orange-500 text-orange-700'}`}>
      <div className="font-black uppercase text-[8px] opacity-60">{team}</div>
      <div className="font-bold truncate">{eventInfo.event.title}</div>
    </div>
  );
};

export default EventItem;