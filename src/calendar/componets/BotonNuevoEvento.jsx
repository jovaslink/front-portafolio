import { addHours } from "date-fns";
import {useCalendarioStore, useOpenModal} from "../../hooks";

export const BotonNuevoEvento = () => {

const {activarEvento} =useCalendarioStore();
const {openModal} =useOpenModal()



const onHandlerClick = ()=> {
    const nuevoEvento={
        title:"",
        notes:"",
        start:new Date(),
        end: addHours(new Date(),2), 
        bgColor:"#fafafa",
        user: {
            _id:123,
            name:"jovaslink",
      },
    };


    activarEvento(nuevoEvento);
    openModal();
    
    
}

  return (
    <button className="btn btn-primary fab" onClick={onHandlerClick} >
        <i className="fas fa-plus fab bp"></i>
    </button>
  )
}
