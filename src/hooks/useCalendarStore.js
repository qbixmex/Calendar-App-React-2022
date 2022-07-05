import { useDispatch, useSelector } from "react-redux";
import { onSetActiveEvent, onAddNewEvent } from "../store";

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
    } else {
      // Creating new event.
      dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
    }
  };

  return {
    // Properties
    events,
    activeEvent,

    // Methods
    setActiveEvent,
    startSavingEvent,
  };
};
