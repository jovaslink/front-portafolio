import {useCalendarioStore} from "../../hooks";


export const BotonEliminarEvento = () => {

const {startEliminarEvento,hasEventSelected} =useCalendarioStore();


const onHandlerClickEliminar= ()=>{
    startEliminarEvento();
  }


  return (
    <button className="btn btn-danger fab-danger" 
            onClick={onHandlerClickEliminar}
            style={{display: hasEventSelected? '' : 'none' }}
             >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
