import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

// TODO: Replace this event when backend is finished
// ----------------------------------------------------
const temporaryEvent = {
  title: 'Junta con el gobierno',
  notes: 'Revizar los términos del tratado de Sokovia',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123456789',
    name: 'Tony Stark'
  }
};
// TODO: Replace this event ---------------------------

const initialState = {
 events: [temporaryEvent],
 activeEvent: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    actionName: ( state, action ) => {
      state.name = action.payload;
    },
  },
});

export const { actionName } = calendarSlice.actions;