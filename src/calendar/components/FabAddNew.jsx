import { useCalendarStore, useUiStore } from "../../hooks";
import { addHours } from "date-fns";

export const FabAddNew = () => {

  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleOnClick = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 1),
      bgColor: '#fafafa',
      user: {
        _id: '123456789',
        name: 'Tony Stark'
      }
    });
    openDateModal();
  };

  return (
    <button
      className="btn btn-primary fab"
      onClick={ handleOnClick }
    >
      <i className="fas fa-plus"></i>
    </button>
  );
};
