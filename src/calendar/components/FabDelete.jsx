import Swal from 'sweetalert2';
import { useCalendarStore, useUiStore } from '../../hooks';


export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const { closeDateModal } = useUiStore();

  const handleDelete = () => {
    startDeletingEvent();
    closeDateModal();
    Swal.fire(
      'Evento Eliminado',
      'El evento fue eliminado satisfactoriamente',
      'success'
    );
  };

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={ handleDelete }
      style={{ display: hasEventSelected ? '' : 'none' }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
