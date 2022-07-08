export const events = [
  {
    id: '1',
    title: 'Junta con el equipo de ventas',
    notes: 'Se trazan los objetivos a',
    start: new Date('2022-08-15 10:00:00'),
    end: new Date('2022-08-15 11:00:00'),
  },
  {
    id: '2',
    title: 'Junta con el equipo de desarrollo',
    notes: 'Se planeará las los tickets para el próximo sprint',
    start: new Date('2022-08-16 10:00:00'),
    end: new Date('2022-08-16 11:00:00'),
  },
];

export const calendarInitialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [ ...events ],
  activeEvent: null
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [ ...events ],
  activeEvent: { ...events[0] }
};
