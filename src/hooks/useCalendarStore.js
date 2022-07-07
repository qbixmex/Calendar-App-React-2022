import { useDispatch, useSelector } from "react-redux";
import {
  onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents
} from "../store";
import calendarAPI from "../api/calendarAPI";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const { events, activeEvent, } = useSelector( state => state.calendar );
  const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveEvent( calendarEvent ) );
  };

  const startSavingEvent = async ( calendarEvent ) => {

    try {

      if ( calendarEvent.id ) {
        // Update Event
        await calendarAPI.patch(`/events/${ calendarEvent.id }`, calendarEvent);
        dispatch( onUpdateEvent({ ...calendarEvent, user }) );
        Swal.fire( 'Correcto', 'El registro se actualizó satisfactoriamente', 'success' );
        return;
      }
  
      // Create Event
      const { data } = await calendarAPI.post('/events', calendarEvent);
      dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );

      Swal.fire('Correcto', 'El registro se guardó satisfactoriamente', 'success');

    } catch (error) {
      console.error(error.response.data.msg);
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
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
