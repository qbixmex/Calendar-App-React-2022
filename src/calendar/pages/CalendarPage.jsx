import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { localizer, getMessagesEs } from "../../helpers";

import { CalendarEvent, Navbar } from "../components";

const events = [{
  title: 'ReactJs Course',
  notes: 'Exercise useState Hook and Custom Hooks',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Tony Stark'
  }
}];

export const CalendarPage = () => {

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    console.log({ event, start, end, isSelected });

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: '#fff',
    };

    return { style };
  };

  return (
    <>
      <Navbar />

      <Calendar
        className='mx-4'
        style={{ height: 'calc(100vh - 120px)' }}
        culture="es"
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        messages={ getMessagesEs() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
      />
    </>
  );

};
