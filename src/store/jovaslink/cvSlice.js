import { createSlice } from '@reduxjs/toolkit';

export const cvSlice = createSlice({
  //nombre del slice con el que se vincula al store
  name: 'cv',
  //declaracion del estado inicial de las variables
  initialState: {
    isLoadingCv: true,
    cv: [],
    cvActivo: null,
  },
  reducers: {
    setCvActivo: (state, action) => {
      state.cvActivo = action.payload;
    },
    setNuevoCv: (state, {payload})=>{
      state.cv.push(payload);
      state.cvActivo = null;
    },
    editarCv: (state, {payload} )=>{
      state.cv=state.cv.map( cv =>{
        if(cv.id===payload.id){
          return payload;
        }
        return cv;
      })
    },
    eliminarCv: (state)=>{
      if(state.cvActivo){
        
      state.cv = state.cv.filter( cv => cv.id !== state.cvActivo.id);
      state.cvActivo = null;

      }
     },
     onLoadCv: (state,{payload})=>{

      state.isLoadingCv=false;
      //state.eventos=payload; funciona para este caso
      //por si requerimos implementar mas funciones adelante, barremos cada evento y agregamos solo si no existe
      payload.forEach((cv)=>{
          const existe = state.cv.some((c)=>{
              return  (c.id===cv.id);
            });
          if(!existe){
              state.cv.push(cv);

          }  
      }); 
 

     },
     onLogoutCv: (state)=>{
        state.isLoadingCv= true;
        state.cv= [];
        state.cvActivo = null;
    },
    
  },
});

export const { cvActivo,setCvActivo,setNuevoCv,editarCv,eliminarCv,onLoadCv,onLogoutCv } = cvSlice.actions;
