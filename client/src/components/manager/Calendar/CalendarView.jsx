import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventItem from './EventItem';
import ScheduleRequestModal from '../Modals/ScheduleRequestModal';

const CalendarView = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [anchorRect, setAnchorRect] = useState(null);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    // If we have the day element, capture its bounding rect to anchor the modal
    const dayEl = arg.dayEl || (arg.jsEvent && arg.jsEvent.target && arg.jsEvent.target.closest('.fc-daygrid-day'));
    if (dayEl && dayEl.getBoundingClientRect) {
      setAnchorRect(dayEl.getBoundingClientRect());
    } else {
      setAnchorRect(null);
    }
    setModalOpen(true);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,dayGridWeek' }}
        dateClick={handleDateClick}
        eventContent={(eventInfo) => <EventItem eventInfo={eventInfo} />}
        events={[
          { id: '1', title: 'CNC Machine Oil Change', start: '2023-10-28', extendedProps: { team: 'Mechanics', status: 'New' } },
        ]}
      />
      {isModalOpen && (
        <ScheduleRequestModal 
          date={selectedDate} 
          anchorRect={anchorRect}
          onClose={() => setModalOpen(false)} 
        />
      )}
    </>
  );
};

export default CalendarView;