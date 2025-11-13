import { createSlice } from '@reduxjs/toolkit';

export const proyectosSlice = createSlice({
  //nombre del slice con el que se vincula al store
  name: 'proyectos',
  //declaracion del estado inicial de las variables
   //declaracion del estado inicial de las variables
  initialState: {
    isLoadingProyectos: true,
    proyectos: [],
    proyectoActivo: null,
  },
  reducers: {
    setProyectoActivo: (state, action) => {
      state.proyectoActivo = action.payload;
    },
    setNuevoProyecto: (state, {payload})=>{
      state.proyecto.push(payload);
      state.proyectoActivo = null;
    },
    editarProyecto: (state, {payload} )=>{
      state.proyecto=state.proyecto.map( proyecto =>{
        if(proyecto.id===payload.id){
          return payload;
        }
        return proyecto;
      })
    },
    eliminarProyecto: (state)=>{
      if(state.proyectoActivo){
        
      state.proyecto = state.proyecto.filter( proyecto => proyecto.id !== state.proyectoActivo.id);
      state.proyectoActivo = null;

      }
     },
     onLoadProyecto: (state,{payload})=>{

      state.isLoadingProyectos=false;
      //state.eventos=payload; funciona para este caso
      //por si requerimos implementar mas funciones adelante, barremos cada evento y agregamos solo si no existe
      payload.forEach((proyecto)=>{
          const existe = state.proyectos.some((p)=>{
              return  (p.id===proyecto.id);
            });
          if(!existe){
              state.proyectos.push(proyecto);

          }  
      }); 
 

     },
     onLogoutProyectos: (state)=>{
        state.isLoadingProyectos= true;
        state.proyectos= [];
        state.proyectoActivo = null;
    },
    
  },
});

export const { proyectoActivo,setProyectoActivo,setNuevoProyecto,editarProyecto,eliminarProyecto,onLoadProyectos,onLogoutProyectos} = proyectosSlice.actions;
