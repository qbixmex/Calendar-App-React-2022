import { useState, useEffect } from "react";
import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { localizer, getMessagesEs } from "../../helpers";

import {
  Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete
} from "../components";
import { useUiStore, useCalendarStore } from "../../hooks";

export const CalendarPage = () => {

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { openDateModal } = useUiStore();

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

  const onDoubleClick = () => {
    openDateModal();
  };

  const onSelect = ( event ) => {
    setActiveEvent( event );
  };

  const onViewChanged = ( event ) => {
    localStorage.setItem( 'lastView', event );
    setLastView( event );
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />
      <Calendar
        className='mx-4'
        style={{ height: 'calc(100vh - 120px)' }}
        culture="es"
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        messages={ getMessagesEs() }
        eventPropGetter={ eventStyleGetter }
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );

};
