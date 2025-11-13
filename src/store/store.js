import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui";
import { authSlice } from "./auth/authSlice";
import {proyectosSlice} from './jovaslink/proyectosSlice';
import {blogSlice} from './jovaslink/blogSlice';
import {cvSlice} from './jovaslink/cvSlice';
import {contactoSlice} from './jovaslink/contactoSlice';


export const store=configureStore({
    
        reducer:{
            auth:authSlice.reducer,
            ui:uiSlice.reducer,
            proyectos:proyectosSlice.reducer,
            blog:blogSlice.reducer,
            cv:cvSlice.reducer,
            contacto:contactoSlice.reducer,
            

        },
        middleware: (getDefaultMiddleware)=> getDefaultMiddleware({serializableCheck:false})
    });
