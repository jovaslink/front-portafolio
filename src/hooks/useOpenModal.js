import { useDispatch, useSelector } from "react-redux"
import { onModalClose, onModalOpen } from "../store/ui";



export const useOpenModal = ()=>{

    const {isOpenModal} = useSelector(state=>state.ui);
    const dispatch=useDispatch();
    
    const openModal=()=>{
        dispatch(onModalOpen());
    }

    const closeModal=()=>{
        dispatch(onModalClose());
    }



    return {
        //propiedades
        isOpenModal,
        //metodos
        openModal,
        closeModal


    }

}