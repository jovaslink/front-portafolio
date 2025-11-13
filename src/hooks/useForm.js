import { useEffect, useMemo, useState } from "react";


export const useForm = (formData, validationForm = {}) => {
    
  
  const [inputform, setInputform] = useState(formData);
  const [ formValidator, setFormValidator ] = useState({}); // Creamos un estado para la validacion 

//Cada vez que cambie algun valor del formulario, se va a ejecutar la validación
  useEffect(() => {
    validator();
}, [ inputform ])

useEffect(() => {
  setInputform(formData);
}, [ formData ])



//vamos a evaluar las propiedades de formValidator, si 1 es null isFormValid es será falso, se usa useMemo como buena practica principalmente. Usamos for, pero podemos usar cualquier ciclo
const isFormValid = useMemo(()=>{

  for (const formValue of Object.keys(formValidator)) { //sacamos las llaves del objeto y las ponemos en formValue
    if(formValidator[formValue]!==null) return false;  // formValidator[formValue] nos va a indicar en que posicion del array vamos a comparar
  }

  return true;

},[formValidator]) //se va a ejecutar cuando alguna propiedad de la validacion cambie 


  
  const onChangeInput = ({target})=>{
        const {name, value} = target; 
        setInputform({
            ...inputform,
            [name]:value
        });
    }
  
  
  const onResetForm = ()=>{
        setInputform(values);
    }

  
  const validator= ()=>{
    
      const formCheckedValues = {};// formamos el objeto para mandarlo al state del validador
    
      //Sacamos cada key del objeto, ej: email, password, displayName 
      for (const formField of Object.keys( validationForm )) {
       
        const [ fn, errorMessage ] = validationForm[formField]; //con el key en formfield formamos la posicion a desestructurar ej: validationForm[email]
        //desestructuramos el array en la funcion y el mensaje de error
        formCheckedValues[`${ formField }Validate`] = fn( inputform[formField] ) ? null : errorMessage; //`${ formField }Validate` crea ej: emailValid
        // enviamos el valor de inputform[formField] evaluado en este momento, ej: email,password o displayName a la funcion y evaluamos  
      }

      setFormValidator( formCheckedValues );
  }

    
    //YA LO ENTENDISTE, NO DESEPERES SOLO ES ALGO DE LOGICA JS. 

  return {
    ...inputform,
    inputform,
    onChangeInput,
    onResetForm,
    ...formValidator,
    isFormValid
  }
    
}