import {
  calendarSlice,
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} from "../../src/store/calendar/calendarSlice";
import {
  calendarInitialState,
  calendarWithEventsState,
  calendarWithActiveEventState,
  events,
} from "../_fixtures/calendarStates";

describe('Test on calendarSlice', () => {
  test('Should return default status', () => {
    const state = calendarSlice.getInitialState();
    expect( state ).toEqual( calendarInitialState );
  });

  test('onSetActiveEvent should active an event', () => {
    const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent(events[0]) );
    expect( state.activeEvent ).toEqual( events[0] );
  });

  test('onAddNewEvent should add a new event', () => {
    const newEvent = {
      id: '3',
      title: 'Curso de NodeJs',
      notes: 'Testing con Jest y Supertest',
      start: new Date('2022-08-17 17:00:00'),
      end: new Date('2022-08-17 18:00:00'),
    };
    const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) );
    expect( state.events ).toEqual([ ...events, newEvent ]);
  });

  test('onUpdateEvent should update an event', () => {
    const updatedEvent = {
      id: '1',
      title: 'Curso de ReactJs',
      notes: 'Testing with Jest and Testing Library',
      start: new Date('2022-08-18 17:00:00'),
      end: new Date('2022-08-18 18:00:00'),
    };
    const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updatedEvent ) );
    expect( state.events ).toContain( updatedEvent );
    expect( state.events ).toEqual([ updatedEvent, events[1] ]);
  });

  test('onDeleteEvent should delete an event', () => {
    const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );
    expect( state.events ).toEqual([ events[1] ]);
    expect( state.activeEvent ).toBe( null );
  });

  test('onLoadEvents should load events', () => {
    const state = calendarSlice.reducer( calendarInitialState, onLoadEvents(events) );
    expect( state.events ).toEqual( events );
    expect( state.isLoadingEvents ).toBe( false );
  });

  test('onLogoutCalendar should clear state', () => {
    const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() );
    expect(state).toEqual( calendarInitialState );
  });
});