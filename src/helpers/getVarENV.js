export const getVarENV = ()=> {
    
    import.meta.env;  //variables de entorno
    
    return {
        ...import.meta.env
    }
}