import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { format, parse, startOfWeek, getDay } from 'date-fns';
import es from 'date-fns/locale/es';
import { addHours } from 'date-fns';

import { Navbar } from "../components";

const locales = {
  'es': es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [{
  title: 'ReactJs Course',
  notes: 'Exercise useState Hook and Custom Hooks',
  start: new Date(),
  end: addHours(new Date(), 1),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Tony Stark'
  }
}];

export const CalendarPage = () => {
  return (
    <>
      <Navbar />

      <Calendar
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 96px)' }}
      />
    </>
  );
};
