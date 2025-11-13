import { useDispatch, useSelector } from "react-redux"
import { editarEvento, setEventoActivo,setNuevoEvento,eliminarEvento, onLoadEvents } from "../store/calendario";
import { getFechasEventos } from "../helpers";
import calendarioApi from "../apis/calendarioApi";
import Swal from "sweetalert2";


export const useCalendarioStore = () => {

  const {eventos,eventoActivo}= useSelector(state=>state.calendario);
  const {user}= useSelector(state=>state.auth);
  const dispatch = useDispatch();
  
  const activarEvento = (evento)=> {
    
  dispatch(setEventoActivo(evento));
    
}

const startNuevoEvento = async (evento)=>{
     //console.log({evento});
    if(evento.id){
      try{
          //Backend
            await calendarioApi.put(`eventos/actualizar/${evento.id}`,evento);
          //store
            dispatch(editarEvento({...evento}));
       

      }catch(err){
        Swal.fire('Error al actualizar el evento',err.response.data?.msg,'error');
          console.log(err);
          
      }
          
    } 
    else {
       
      try{
          //Backend 
            const {data} = await calendarioApi.post('eventos/crear', evento);
            //console.log(data.eventoBD.id);
          //store
            dispatch(setNuevoEvento({...evento, id: data.eventoBD.id, user }));

      } catch(err){
            console.log(err);
            
      }
      

    }
  


}

const startEliminarEvento = async ()=>{
    try{
        //backend  
           await calendarioApi.delete(`eventos/borrar/${eventoActivo.id}`);
        //store
          dispatch(eliminarEvento());
    } catch(err){
          Swal.fire('Error al eliminar el evento',err.response.data?.msg,'error');
          console.log(err);
          
    }

}

const startObtenerEventos = async ()=>{
    try{

         const {data} = await calendarioApi.get('eventos');
         const eventos = getFechasEventos(data.eventos);
         dispatch(onLoadEvents(eventos));
         
    }catch(err){
      console.log(err);
    }

}



  return {
    //propiedades
        eventos,
        eventoActivo,
        hasEventSelected: !!eventoActivo , // convierte en true o false
    //metodos
        activarEvento,
        startNuevoEvento,
        startEliminarEvento,
        startObtenerEventos,


  }
}
