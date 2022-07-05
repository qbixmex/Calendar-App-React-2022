import { useDispatch, useSelector } from "react-redux";
import {
  onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent
} from "../store";

export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const {
    events,
    activeEvent,
  } = useSelector( state => state.calendar );

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveEvent( calendarEvent ) );
  };

  const startSavingEvent = async ( calendarEvent ) => {
    // TODO: go to backend

    // TODO: ok
    if ( calendarEvent._id ) {
      // Updating existing event.
      dispatch( onUpdateEvent({ ...calendarEvent }) );
    } else {
      // Creating new event.
      dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
    }
  };

  const startDeletingEvent = async () => {
    // TODO: go to backend

    dispatch( onDeleteEvent() );
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
  };
};
