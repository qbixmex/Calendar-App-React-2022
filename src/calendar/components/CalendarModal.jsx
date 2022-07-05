import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

  const [isOpen, setIsOpen] = useState(true);

  const onOpenModal = () => {
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-background"
      closeTimeoutMS={200}
    >
      <h1>Crear Evento</h1>
      <hr />

      <form className="container">

        <div className="form-group mb-2">
          <input className="form-control" placeholder="Fecha y hora inicial" />
        </div>

        <div className="form-group mb-2">
          <input className="form-control" placeholder="Fecha y hora final" />
        </div>

        <hr />

        <div className="form-group mb-2">
          <label className='mb-2'><b>Título y notas</b></label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
          />
        </div>

        <div className="form-group mb-3">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
          ></textarea>
        </div>

        <hr />

        <div className='d-grid'>
          <button
            type="submit"
            className="btn btn-outline-primary"
          >
            <i className="far fa-save" />&nbsp;
            <span>Guardar</span>
          </button>
        </div>

      </form>
    </Modal>
  );
};
