import { useDispatch, useSelector } from "react-redux"
import calendarioApi from "../apis/calendarioApi";
import { onChecking, onClearErrorMessagge, onLogin, onLogout } from "../store/auth/authSlice";
import { onLogoutCalendar } from "../store/calendario/calendarioSlice";

export const useAuthStore = () => {

    const {status,user,errorMessagge}=useSelector(state=> state.auth);
    const dispatch=useDispatch();

    const startLogin = async (email,password)=>{
        
        dispatch(onChecking());
        
        
        try{
            
            const {data}= await calendarioApi.post('auth',{email,password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime()); //hora del token
            dispatch(onLogin({name:data.name, uid:data.usuario, email}));
            
        
        }
        catch(err){
            dispatch(onLogout('Usuario y contraseña incorrecta'));
            
            setTimeout(()=>{
                dispatch(onClearErrorMessagge());

            },10);
            console.log({err});

        }


    }
    const startRegister=async(name,email,password)=>{

        dispatch(onChecking());
        
        
        try{
            
            const {data}= await calendarioApi.post('auth/new',{name,email,password});
            //console.log({data});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime()); //hora del token
            dispatch(onLogin({name:data.name, uid:data.uid, email:data.email}));
            
        
        }
        catch(err){
            
            dispatch(onLogout(err.response.data?.msg || '-'));
            
            setTimeout(()=>{
                dispatch(onClearErrorMessagge());

            },10);

        } 



    }
    
    const startLogOut = ()=>{
         localStorage.clear();
         dispatch(onLogoutCalendar());
         dispatch(onLogout());
    }

    const checkAuthToken = async()=>{
        const token = localStorage.getItem('token');
        if(!token) return (dispatch(onLogout()));

        try{
            const {data}= await calendarioApi.get('auth/renew');
            console.log({data});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime()); //hora del token
            dispatch(onLogin({name:data.name, uid:data.uid, email:data.email}));
            


        }
        catch(err){
            localStorage.clear();
            dispatch(onLogout());
            console.log(err);
        }
    
    
    }
  
  
    return {
        //propiedades
        status,user,errorMessagge,

        //metodos
        startLogin,
        startRegister,
        startLogOut,
        checkAuthToken,


    }
}
