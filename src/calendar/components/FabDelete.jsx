import Swal from 'sweetalert2';
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
      className="btn btn-danger fab-danger"
      onClick={ handleDelete }
      style={{ display: hasEventSelected && isModalClose ? '' : 'none' }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
