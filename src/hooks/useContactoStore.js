import { useDispatch, useSelector } from "react-redux"
import { editarMensaje, setMensajeActivo,setNuevoMensaje,eliminarMensaje, onLoadMensajes } from "../store/jovaslink";
import { getFechasEventos } from "../helpers";
import jovaslinkApi from "../apis/jovaslinkApi";
import Swal from "sweetalert2";


export const useContactoStore = () => {

  const {mensajes, mensajeActivo}= useSelector(state=>state.contacto);
  const {user}= useSelector(state=>state.auth);
  const dispatch = useDispatch();
  
  const activarMensaje = (mensaje)=> {
    
  dispatch(setMensajeActivo(mensaje));
    
}

const startNuevoMensaje = async (mensaje)=>{
     //console.log({evento});
    if(mensaje.id){
      try{
          //Backend
            await jovaslinkApi.put(`contacto/actualizar/${mensaje.id}`, mensaje);
          //store
            dispatch(editarMensaje({...mensaje}));
       

      }catch(err){
        Swal.fire('Error al actualizar el mensaje',err.response.data?.msg,'error');
          console.log(err);
          
      }
          
    } 
    else {
       
      try{
          //Backend 
            const {data} = await jovaslinkApi.post('contacto/crear', mensaje);
            //console.log(data.eventoBD.id);
          //store
            dispatch(setNuevoMensaje({...mensaje, id: data.mensajeBD.id, user }));

      } catch(err){
            console.log(err);
            
      }
      

    }
  


}

const startEliminarMensaje = async ()=>{
    try{
        //backend  
           await jovaslinkApi.delete(`contacto/borrar/${mensajeActivo.id}`);
        //store
          dispatch(eliminarMensaje());
    } catch(err){
          Swal.fire('Error al eliminar el mensaje',err.response.data?.msg,'error');
          console.log(err);
          
    }

}

const startObtenerMensajes = async ()=>{
    try{

         const {data} = await jovaslinkApi.get('mensajes');
         //const mensajes = getFechasEventos(data.mensajes);
         dispatch(onLoadMensajes(data.mensajes));
         
    }catch(err){
      console.log(err);
    }

}



  return {
    //propiedades
        mensajes,
        mensajeActivo,
        hasMensajeSelected: !! mensajeActivo , // convierte en true o false
    //metodos
        activarMensaje,
        startNuevoMensaje,
        startEliminarMensaje,
        startObtenerMensajes,


  }
}
