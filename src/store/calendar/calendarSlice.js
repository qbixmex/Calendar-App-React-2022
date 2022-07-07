import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: ( state, action ) => {
      state.activeEvent = action.payload;
    },
    onAddNewEvent: ( state, action ) => {
      state.events.push( action.payload );
      state.activeEvent = null;
    },
    onUpdateEvent: ( state, action ) => {
      state.events = state.events.map(event => {
        if ( event.id === action.payload.id ) return action.payload;
        return event;
      });
      state.activeEvent = null;
    },
    onDeleteEvent: ( state ) => {
      if (state.activeEvent) {
        state.events = state.events.filter( event => event.id !== state.activeEvent.id );
        state.activeEvent = null;
      }
    },
    onLoadEvents: ( state, action ) => {
      state.isLoadingEvents = false;
      action.payload.forEach(event => {
        const exists = state.events.some( dbEvent => dbEvent.id === event.id );
        if( !exists ) state.events.push( event );
      });
    },
  },
});

export const {
  onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents
} = calendarSlice.actions;
