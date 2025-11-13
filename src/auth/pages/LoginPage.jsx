import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';

const validationFormLogin= {
  emailLogin:[(value)=>{return value.includes('@');},'Tiene que ser un email válido.'],
  passwordLogin:[(value)=>{return value.length >=6},'La contraseña debe tener mas de 6 caracteres.']

}; // UseForm tiene la capacidad de evaluar si el formulario es correcto. Si se desea se puede evaluar cada input del formulario por separado y no usar useForm

const dataFormLogin= {
                emailLogin:'',
                passwordLogin:''
  }

const validationFormRegister= {
  nameRegister:[(value)=>{return value.length >=2},'Tu nombre debe tener mas de 2 caracteres.'],
  emailRegister:[(value)=>{return value.includes('@');},'Tiene que ser un email válido.'],
  passwordRegister:[(value)=>{return value.length >=6},'La contraseña debe tener mas de 6 caracteres.']

}; // UseForm tiene la capacidad de evaluar si el formulario es correcto. Si se desea se puede evaluar cada input del formulario por separado y no usar useForm

const dataFormRegister= {
                
                nameRegister:'',
                emailRegister:'',
                passwordRegister:'',
                passwordRegister2:'',
  }

export const LoginPage = () => {
    const {startLogin,startRegister,errorMessagge}= useAuthStore();

    const {
            emailLogin,
            passwordLogin,
            onChangeInput:onChangeInputLogin,
            inputform:inputformLogin,
            emailValidate:emailValidateLogin,
            passwordValidate:passwordValidateLogin,
            isFormValid:isFormValidLogin
        } = useForm (dataFormLogin, validationFormLogin);

    const {
            nameRegister,
            emailRegister,
            passwordRegister,
            passwordRegister2,
            onChangeInput:onChangeInputRegister,
            inputform:inputformRegister,
            emailValidate:emailValidateRegister,
            passwordValidate:passwordValidateRegister,
            isFormValid:isFormValidRegister
        } = useForm (dataFormRegister, validationFormRegister);    

      

    const onSubmitLoginForm = (event)=>{
        event.preventDefault();
        //setFormSubmitted(true);
        if(!isFormValidLogin) return;
        startLogin(emailLogin,passwordLogin);
        //dispatch(getAuth(email,password));
        //dispatch(startLoginWithEmailPassword(inputform));
        }

    const onSubmitRegisterForm = (event)=>{
        event.preventDefault();
        //setFormSubmitted(true);
        if(!isFormValidRegister) return;
        if(passwordRegister !== passwordRegister2){
            Swal.fire('Error en el registro','Las constraseñas no son iguales','error');
            return;
        }
        
        startRegister(nameRegister,emailRegister,passwordRegister);
        //console.log(inputformRegister);

        //dispatch(getAuth(email,password));
        //dispatch(startLoginWithEmailPassword(inputform));
        }  

    useEffect(() => {

        if(errorMessagge!==undefined){
            Swal.fire('Error de autenticación',errorMessagge,'error');
        }
      
    
    }, [errorMessagge])
    
    
        return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={onSubmitLoginForm} >
                        <div className="form-group mb-2">
                            <input 
                                onChange={onChangeInputLogin}
                                label="Correo" 
                                type="email" 
                                name='emailLogin'
                                placeholder='correo@gmail.com' 
                                className="form-control"
                                
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                onChange={onChangeInputLogin}
                                label="Contraseña" 
                                type="password" 
                                name="passwordLogin"
                                placeholder='Contraseña' 
                                className="form-control"
                                
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={onSubmitRegisterForm}>
                        <div className="form-group mb-2">
                            <input
                                onChange={onChangeInputRegister}
                                name='nameRegister'
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                onChange={onChangeInputRegister}
                                name='emailRegister'
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                onChange={onChangeInputRegister}
                                name='passwordRegister'
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                onChange={onChangeInputRegister}
                                name='passwordRegister2'
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}