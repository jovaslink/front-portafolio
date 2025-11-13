import { createSlice } from '@reduxjs/toolkit';




export const calendarioSlice = createSlice({
  //nombre del slice con el que se vincula al store
  name: 'calendario',
  //declaracion del estado inicial de las variables
  initialState: {
    isLoadingEvents: true,
    eventos: [],
    eventoActivo: null,
  },
  reducers: {
    setEventoActivo: (state, action) => {
      state.eventoActivo = action.payload;
    },
    setNuevoEvento: (state, {payload})=>{
      state.eventos.push(payload);
      state.eventoActivo = null;
    },
    editarEvento: (state, {payload} )=>{
      state.eventos=state.eventos.map( evento =>{
        if(evento.id===payload.id){
          return payload;
        }
        return evento;
      })
    },
    eliminarEvento: (state)=>{
      if(state.eventoActivo){
        
      state.eventos = state.eventos.filter( evento => evento.id !== state.eventoActivo.id);
      state.activeEvent = null;

      }
     },
     onLoadEvents: (state,{payload})=>{

      state.isLoadingEvents=false;
      //state.eventos=payload; funciona para este caso
      //por si requerimos implementar mas funciones adelante, barremos cada evento y agregamos solo si no existe
      payload.forEach((evento)=>{
          const existe = state.eventos.some((e)=>{
              return  (e.id===evento.id);
            });
          if(!existe){
              state.eventos.push(evento);

          }  
      }); 
 

     },
     onLogoutCalendar: (state)=>{
        state.isLoadingEvents= true;
        state.eventos= [];
        state.eventoActivo = null;
    },
    
  },
});

export const { eventoActivo,setEventoActivo,setNuevoEvento,editarEvento,eliminarEvento,onLoadEvents,onLogoutCalendar } = calendarioSlice.actions;
