import { useDispatch, useSelector } from "react-redux"
import { editarBlog, setBlogActivo,setNuevoBlog,eliminarBlog, onLoadBlogs } from "../store/jovaslink";
import { getFechasEventos } from "../helpers";
import jovaslinkApi from "../apis/jovaslinkApi";
import Swal from "sweetalert2";


export const useBlogStore = () => {

  const {blogs,blogActivo}= useSelector(state=>state.blog);
  const {user}= useSelector(state=>state.auth);
  const dispatch = useDispatch();
  
  const activarBlog = (blog)=> {
    
  dispatch(setBlogActivo(blog));
    
}

const startNuevoBlog = async (blog)=>{
     //console.log({evento});
    if(blog.id){
      try{
          //Backend
            await jovaslinkApi.put(`blog/actualizar/${blog.id}`,blog);
          //store
            dispatch(editarBlog({...blog}));
       

      }catch(err){
        Swal.fire('Error al actualizar el blog',err.response.data?.msg,'error');
          console.log(err);
          
      }
          
    } 
    else {
       
      try{
          //Backend 
            const {data} = await jovaslinkApi.post('blog/crear', blog);
            //console.log(data.eventoBD.id);
          //store
            dispatch(setNuevoBlog({...blog, id: data.blogBD.id, user }));

      } catch(err){
            console.log(err);
            
      }
      

    }
  


}

const startEliminarBlog = async ()=>{
    try{
        //backend  
           await jovaslinkApi.delete(`blog/borrar/${blogActivo.id}`);
        //store
          dispatch(eliminarBlog());
    } catch(err){
          Swal.fire('Error al eliminar el blog',err.response.data?.msg,'error');
          console.log(err);
          
    }

}

const startObtenerBlog = async ()=>{
    try{

         const {data} = await jovaslinkApi.get('blog');
         //const blogs = getFechasEventos(data.eventos);
         dispatch(onLoadBlogs(data.blog));
         
    }catch(err){
      console.log(err);
    }

}



  return {
    //propiedades
        blogs,
        blogActivo,
        hasBlogSelected: !! blogActivo , // convierte en true o false
    //metodos
        activarBlog,
        startNuevoBlog,
        startEliminarBlog,
        startObtenerBlog,


  }
}
