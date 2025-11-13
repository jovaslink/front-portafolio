import { useDispatch, useSelector } from "react-redux"
import { editarProyecto, setProyectoActivo,setNuevoProyecto,eliminarProyecto, onLoadProyectos } from "../store/jovaslink/";
import { getFechasEventos } from "../helpers";
import jovaslinkApi from "../apis/jovaslinkApi";
import Swal from "sweetalert2";


export const useProyectosStore = () => {

  const {proyectos,proyectoActivo}= useSelector(state=>state.proyectos);
  const {user}= useSelector(state=>state.auth);
  const dispatch = useDispatch();
  
  const activarProyecto = (proyecto)=> {
    
  dispatch(setProyectoActivo(proyecto));
    
}

const startNuevoProyecto = async (proyecto)=>{
     //console.log({evento});
    if(proyecto.id){
      try{
          //Backend
            await jovaslinkApi.put(`proyectos/actualizar/${proyecto.id}`,proyecto);
          //store
            dispatch(editarProyecto({...proyecto}));
       

      }catch(err){
        Swal.fire('Error al actualizar el proyecto',err.response.data?.msg,'error');
          console.log(err);
          
      }
          
    } 
    else {
       
      try{
          //Backend 
            const {data} = await jovaslinkApi.post('proyectos/crear', proyecto);
            //console.log(data.eventoBD.id);
          //store
            dispatch(setNuevoProyecto({...proyecto, id: data.proyectoBD.id, user }));

      } catch(err){
            console.log(err);
            
      }
      

    }
  


}

const startEliminarProyecto = async ()=>{
    try{
        //backend  
           await jovaslinkApi.delete(`proyectos/borrar/${proyectoActivo.id}`);
        //store
          dispatch(eliminarProyecto());
    } catch(err){
          Swal.fire('Error al eliminar el proyecto',err.response.data?.msg,'error');
          console.log(err);
          
    }

}

const startObtenerProyectos = async ()=>{
    try{

         const {data} = await jovaslinkApi.get('proyectos');
         const proyectos = data.proyectos;
         dispatch(onLoadEvents(proyectos));
         
    }catch(err){
      console.log(err);
    }

}



  return {
    //propiedades
        proyectos,
        proyectoActivo,
        hasProyectoSelected: !!proyectoActivo , // convierte en true o false
    //metodos
        activarProyecto,
        startNuevoProyecto,
        startEliminarProyecto,
        startObtenerProyectos,


  }
}
