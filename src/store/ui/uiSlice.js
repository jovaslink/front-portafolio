import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  //nombre del slice con el que se vincula al store
  name: 'ui',
  //declaracion del estado inicial de las variables
  initialState: {
    isOpenModal: false,
  },
  reducers: {
    onModalOpen: (state) => {
      state.isOpenModal = true;
    },
    onModalClose: (state) => {
      state.isOpenModal = false;
    },

  },
});

export const { onModalOpen, onModalClose } = uiSlice.actions;
