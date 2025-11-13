import { createSlice } from '@reduxjs/toolkit';

export const blogSlice = createSlice({
  //nombre del slice con el que se vincula al store
  name: 'blog',
  //declaracion del estado inicial de las variables
  initialState: {
    isLoadingBlogs: true,
    blogs: [],
    blogActivo: null,
  },
  reducers: {
    setBlogActivo: (state, action) => {
      state.proyectoBlog = action.payload;
    },
    setNuevoBlog: (state, {payload})=>{
      state.blog.push(payload);
      state.blogActivo = null;
    },
    editarBlog: (state, {payload} )=>{
      state.blog=state.blog.map( blog =>{
        if(blog.id===payload.id){
          return payload;
        }
        return blog;
      })
    },
    eliminarBlog: (state)=>{
      if(state.blogActivo){
        
      state.blog = state.blog.filter( blog => blog.id !== state.blogActivo.id);
      state.blogActivo = null;

      }
     },
     onLoadBlogs: (state,{payload})=>{

      state.isLoadingBlog=false;
      //state.eventos=payload; funciona para este caso
      //por si requerimos implementar mas funciones adelante, barremos cada evento y agregamos solo si no existe
      payload.forEach((blog)=>{
          const existe = state.blogs.some((b)=>{
              return  (b.id===blog.id);
            });
          if(!existe){
              state.blog.push(blog);

          }  
      }); 
 

     },
     onLogoutBlogs: (state)=>{
        state.isLoadingBlogs= true;
        state.blogs= [];
        state.blogActivo = null;
    },
    
  },
});

export const { blogActivo,setBlogActivo,setNuevoBlog,editarBlog,eliminarBlog,onLoadBlogs,onLogoutBlogs} = blogSlice.actblog;
