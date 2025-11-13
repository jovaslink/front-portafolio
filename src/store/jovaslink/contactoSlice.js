import { createSlice } from '@reduxjs/toolkit';

export const contactoSlice = createSlice({
  //nombre del slice con el que se vincula al store
  name: 'contacto',
  //declaracion del estado inicial de las variables
    initialState: {
    isLoadingMensajes: true,
    mensajes: [],
    mensajeActivo: null,
  },
  reducers: {
    setMensajeActivo: (state, action) => {
      state.mensajesActivo = action.payload;
    },
    setNuevoMensaje: (state, {payload})=>{
      state.Mensaje.push(payload);
      state.mensajeActivo = null;
    },
    editarMensaje: (state, {payload} )=>{
      state.mensajes=state.mensajes.map( mensaje =>{
        if(mensaje.id===payload.id){
          return payload;
        }
        return mensaje;
      })
    },
    eliminarMensaje: (state)=>{
      if(state.mensajeActivo){
        
      state.mensajes = state.mensajes.filter( mensaje => mensaje.id !== state.mensajeActivo.id);
      state.mensajeActivo = null;

      }
     },
     onLoadMensaje: (state,{payload})=>{

      state.isLoadingMensajes=false;
      //state.eventos=payload; funciona para este caso
      //por si requerimos implementar mas funciones adelante, barremos cada evento y agregamos solo si no existe
      payload.forEach((mensaje)=>{
          const existe = state.mensajes.some((m)=>{
              return  (m.id===mensaje.id);
            });
          if(!existe){
              state.mensajes.push(mensaje);

          }  
      }); 
 

     },
     onLogoutMensajes: (state)=>{
        state.isLoadingMensajes= true;
        state.mensajes= [];
        state.mensajeActivo = null;
    },
    
  },


});

export const { mensajeActivo,setMensajeActivo,setNuevoMensaje,editarMensaje,eliminarMensaje,onLoadMensajes,onLogoutMensajes } = contactoSlice.actions;
