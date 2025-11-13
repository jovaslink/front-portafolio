import { addHours, differenceInSeconds } from "date-fns";
import { useState,useMemo, useEffect } from "react";
import Modal from "react-modal";
import DatePicker,{registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { es } from 'date-fns/locale/es';
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarioStore, useOpenModal } from "../../hooks";


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


export const CalendarModal = () => {

const {isOpenModal,closeModal} = useOpenModal();
const {eventoActivo,startNuevoEvento } = useCalendarioStore(); 
  
  const [inputForm, setInputForm] = useState(
      {
        title:"jovaslink",
        notes:"jeje",
        start: new Date(),
        end: addHours(new Date(),2),

      })

useEffect(() => {

    if( eventoActivo !== null ){
      setInputForm({...eventoActivo});
    }
    
  }, [eventoActivo])




      

const [formEnviado, setFormEnviado] = useState(false);

const titleClass = useMemo(() => {
      if(!formEnviado) return "" ;
      return (inputForm.title.length > 0
        ? 'is-valid'
        : 'is-invalid'
      ) 
  } 
  ,[formEnviado,inputForm.title])

  const onCloseModal = ()=>{
    closeModal();
    console.log("MODAL CERRADO");
  }

  const onChangeInputForm= ({target})=>{

    setInputForm({
      ...inputForm,
      [target.name]:target.value

    });
 }
  
 const onChangeDate = (event, changing)=>{
    setInputForm ({
      ...inputForm,
      [changing]:event
    });
  }

const onSubmit = async (event)=>{
    event.preventDefault();
    setFormEnviado(true);
    const diferenciaHora= differenceInSeconds(inputForm.end,inputForm.start);
    if(isNaN(diferenciaHora) || diferenciaHora <= 0 ){
      console.log("ERROR EN LA FECHA");
      Swal.fire('Error en las fechas','Revisar las fechas ingresadas','error');
      return;
    }
    if (inputForm.title.length <= 0) return
    
    //console.log({inputForm});
    await startNuevoEvento(inputForm);
    closeModal();
    setFormEnviado(false);
  

  }

  return (
    <Modal isOpen={isOpenModal}
       onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
    >

      <h1> Nuevo evento </h1>
<hr />
<form className="container" onSubmit={onSubmit}>

    <div className="form-group mb-2">
        <label>Fecha y hora inicio</label>
        <DatePicker 
          selected={inputForm.start} 
          className="form-control" 
          onChange= { (event) => onChangeDate(event,"start")} 
          dateFormat="Pp"
          showTimeSelect
          locale="es"
          timeCaption="Hora"
        />
       
    </div>

    <div className="form-group mb-2">
        <label>Fecha y hora fin</label>
        <DatePicker 
          minDate={inputForm.start}
          selected={inputForm.end} 
          className="form-control" 
          onChange= { (event) => onChangeDate(event,"end")} 
          dateFormat="Pp"
          showTimeSelect
          locale="es"
          timeCaption="Hora"
        />
    </div>

    <hr />
    <div className="form-group mb-2">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            onChange={onChangeInputForm}
            value={inputForm.title}
            autoComplete="off"
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group mb-2">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            value={inputForm.notes}
            onChange={onChangeInputForm}
            rows="5"
            name="notes"
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
      



    </Modal>
  )
}
