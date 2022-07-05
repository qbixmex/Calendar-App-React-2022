import { useState, useMemo } from 'react';
import Modal from 'react-modal';
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

registerLocale('es', es);

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

const initialForm = {
  title: 'Meeting with the team',
  notes: 'We\'re going to talk about next spring topics',
  startDate: new Date(),
  endDate: addHours(new Date(), 2),
};

export const CalendarModal = () => {
  const [ isOpen, setIsOpen ] = useState(true);

  const [ formSubmitted, setFormSubmitted ] = useState(false);
  
  const [ formValues, setFormValues ] = useState(initialForm);

  const { title, notes, startDate, endDate } = formValues;

  const titleClass = useMemo(() => {
    if(!formSubmitted) return '';
    return ( title.length > 0 ) ? ' is-valid' : ' is-invalid';
  },[ title, formSubmitted ]);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [ target.name ]: target.value
    });
  };

  const onDateChange = ( event, changing ) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  };

  const onOpenModal = () => {
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds( endDate, startDate );

    if ( isNaN( difference) ) {
      return Swal.fire(
        'Fechas Erroneas',
        'Revise que las fechas sean correctas ó no estén vacías',
        'error'
      );
    }

    if ( difference <= 0 ) {
      return Swal.fire(
        'Fecha Final',
        'La fecha final debe ser mayor a la fecha inicial',
        'error'
      );
    }

    if ( title.length <= 0) {
      return Swal.fire(
        'Título',
        'El título no puede ir vacío',
        'error'
      );
    };

    console.table(formValues);
    
    return Swal.fire(
      'Formulario Enviado',
      'Los datos del formulario son correctos',
      'success'
    );

    // TODO close modal
    // TODO remove screen errors
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

      <form className="container" onSubmit={ onFormSubmit }>
        <div className="form-group mb-2">
          <DatePicker
            className='form-control'
            selected={ startDate }
            onChange={ event => onDateChange( event, 'startDate' ) }
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
        <DatePicker
            minDate={ startDate }
            className='form-control'
            selected={ endDate }
            onChange={ event => onDateChange( event, 'endDate' ) }
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />

        <div className="form-group mb-2">
          <input
            type="text"
            className={ `form-control${ titleClass }`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ title }
            onChange={ onInputChange }
          />
        </div>

        <div className="form-group mb-3">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ notes }
            onChange={ onInputChange }
          />
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
