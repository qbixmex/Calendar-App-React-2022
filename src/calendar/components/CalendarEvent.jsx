export const CalendarEvent = ({ event }) => {

  const { title, user } = event;

  return (
    <>
      <span><b>{ title } - </b></span>
      <span>{ user.name }</span>
    </>
  );
};
