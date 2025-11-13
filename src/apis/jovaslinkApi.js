import axios from "axios"; 
import { getVarENV } from "../helpers/getVarENV";

const {VITE_API_URL} =getVarENV();

const jovaslinkApi= axios.create({
    baseURL:VITE_API_URL,

});

//INTERCEPTORES 
//interceptamos la request y modificamos los headers para enviar siempre el token 
jovaslinkApi.interceptors.request.use( (config)=>{

    config.headers={
        ...config.headers, //esparcimos headers que pudieran existir
        'x-token':localStorage.getItem('token'), 
    } 
    
    return config; 
});

export default  jovaslinkApi;