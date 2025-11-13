import { useDispatch, useSelector } from "react-redux"
import { editarCv, setCvActivo,setNuevoCv,eliminarCv, onLoadCv } from "../store/jovaslink";
import { getFechasEventos } from "../helpers";
import jovaslinkApi from "../apis/jovaslinkApi";
import Swal from "sweetalert2";


export const useCvStore = () => {

  const {cv,cvActivo}= useSelector(state=>state.cv);
  const {user}= useSelector(state=>state.auth);
  const dispatch = useDispatch();
  
  const activarCv = (cv)=> {
    
  dispatch(setCvActivo(cv));
    
}

const startNuevoCv = async (cv)=>{
     //console.log({evento});
    if(cv.id){
      try{
          //Backend
            await jovaslinkApi.put(`cv/actualizar/${cv.id}`,cv);
          //store
            dispatch(editarCv({...cv}));
       

      }catch(err){
        Swal.fire('Error al actualizar el CV',err.response.data?.msg,'error');
          console.log(err);
          
      }
          
    } 
    else {
       
      try{
          //Backend 
            const {data} = await jovaslinkApi.post('cv/crear', cv);
            //console.log(data.eventoBD.id);
          //store
            dispatch(setNuevoCv({...cv, id: data.cvBD.id, user }));

      } catch(err){
            console.log(err);
            
      }
      

    }
  


}

const startEliminarCv = async ()=>{
    try{
        //backend  
           await jovaslinkApi.delete(`cv/borrar/${cvActivo.id}`);
        //store
          dispatch(eliminarCv());
    } catch(err){
          Swal.fire('Error al eliminar el CV',err.response.data?.msg,'error');
          console.log(err);
          
    }

}

const startObtenerCv = async ()=>{
    try{

         const {data} = await jovaslinkApi.get('cv');
         //const cv = getFechasEventos(data.eventos);
         dispatch(onLoadEvents(data.cv));
         
    }catch(err){
      console.log(err);
    }

}



  return {
    //propiedades
        cv,
        cvActivo,
        hasCvSelected: !! cvActivo , // convierte en true o false
    //metodos
        activarCv,
        startNuevoCv,
        startEliminarCv,
        startObtenerCv,


  }
}
