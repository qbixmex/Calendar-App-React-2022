import { useState } from "react";
import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { localizer, getMessagesEs } from "../../helpers";

import { CalendarEvent, CalendarModal, Navbar } from "../components";

const events = [{
  title: 'Meeting with UX team',
  notes: 'Check screens for app',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Tony Stark'
  }
}];

export const CalendarPage = () => {

  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    const style = {
      width: '100%',
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: '#fff',
    };

    return { style };
  };

  const onDoubleClick = ( event ) => {
    console.log({ doubleClick: event });
  };

  const onSelect = ( event ) => {
    console.log({ clicked: event });
  };

  const onViewChanged = ( event ) => {
    localStorage.setItem( 'lastView', event );
    setLastView( event );
  };

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 120px)' }}
        className='mx-4'
        messages={ getMessagesEs() }
        eventPropGetter={ eventStyleGetter }
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal />
    </>
  );

};
