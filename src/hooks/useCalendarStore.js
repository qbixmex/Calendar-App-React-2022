import { useDispatch, useSelector } from "react-redux";
import {
  onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents
} from "../store";
import calendarAPI from "../api/calendarAPI";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const { events, activeEvent, } = useSelector( state => state.calendar );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveEvent( calendarEvent ) );
  };

  const startSavingEvent = async ( calendarEvent ) => {

    if ( calendarEvent._id ) {
      // Updating existing event.
      dispatch( onUpdateEvent({ ...calendarEvent }) );
    } else {
      const { data } = await calendarAPI.post('/events', calendarEvent);
      dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );
    }

  };

  const startDeletingEvent = async () => {
    // TODO: go to backend

    dispatch( onDeleteEvent() );
  };

  const startLoadingEvents = async () => {
    try {

      const { data } = await calendarAPI.get('/events');

      const events = convertEventsToDateEvents( data.events );

      dispatch( onLoadEvents( events ) );

    } catch (error) {
      console.error('Error cargando eventos');
      console.error(error);
    }
  };

  return {
    // Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
