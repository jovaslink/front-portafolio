import {Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
import { JovaslinkRoutes } from "../jovaslink/routes";
import {AdminRoutes} from "../admin/routes";
import { LoginPage } from "../auth";





export const AppRouter = () => {
    const {status,checkAuthToken}=useAuthStore();
    

    useEffect(() => {
      checkAuthToken();
    }, [])
    

    if(status==='checking'){
     return (<h3>Cargando...</h3>);

    }
    //const authStatus = 'NO-LOGIN';
    //console.log( getVarENV()); //VARIABLE DE ENTORNO, PRUEBAS
return (

    
        <Routes>
            {
                
                
                
                (status==='no-autenticado')
                    ?   ( 
                            <>
                                
                                <Route path="/*" element={<JovaslinkRoutes/>} />
                                <Route path="/auth/*" element={<LoginPage/>} />
                            </>
                        )
                    :   (
                            <>        
                                
                                {/*ADMIN PAGE*/}                            
                                <Route path= "/" element={<AdminRoutes/>} />
                                <Route path= "/*" element= {<Navigate to="/" />} />
                            </>
                        )
                
            }
                
                

                
                
            
        </Routes>
      
  )
}
