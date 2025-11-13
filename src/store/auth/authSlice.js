import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  //nombre del slice con el que se vincula al store
  name: 'name',
  //declaracion del estado inicial de las variables 
  initialState: {
    status: 'checking',
    user:{},
    errorMessagge:undefined,
  },
  reducers: {
    onChecking: (state)=>{
        state.status='checking';
        state.user={};
        state.errorMessagge = undefined;
        

    },
    onLogin:(state, action)=>{
      const {payload}=action;
      state.status='autenticado';
      state.user=payload;
      state.errorMessagge=undefined;
    },
    onLogout:(state, { payload })=>{
      state.status='no-autenticado';
      state.user={};
      state.errorMessagge=payload;
    },
    onClearErrorMessagge:(state, { payload })=>{
      state.errorMessagge=undefined;
    },

  },
});

export const { onChecking,onLogin,onLogout,onClearErrorMessagge } = authSlice.actions;
