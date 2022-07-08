import { useCalendarStore, useUiStore } from '../../hooks';

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const { closeDateModal, isModalClose } = useUiStore();

  const handleDelete = () => {
    startDeletingEvent();
    closeDateModal();
  };

  return (
    <button
      id="delete-btn"
      className="btn btn-danger fab-danger"
      onClick={ handleDelete }
      style={{ display: hasEventSelected && isModalClose ? '' : 'none' }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
