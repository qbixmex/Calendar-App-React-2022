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
    setIsOpen( true );
  };
  
  const onCloseModal = () => {
    setIsOpen( false );
  };

  return (
    <Modal
      className="modal"
      style={ customStyles }
      isOpen={ isOpen }
      onRequestClose={ onCloseModal }
      overlayClassName="modal-background"
      closeTimeoutMS={ 200 }
    >
      <h2>Custom Modal</h2>
      <div>This is the content of my custom modal and it's very important.</div>
    </Modal>
  );
};
