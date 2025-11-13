import { useEffect, useState } from 'react';
import { Calendar} from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BotonNuevoEvento, CalendarEvent, CalendarModal, NavBar,BotonEliminarEvento } from "../componets";
import {localizer,getMessages} from '../../helpers';
import { useAuthStore, useCalendarioStore, useOpenModal } from '../../hooks';






export const CalendarPage = () => {
  const {user} = useAuthStore(); 
  const [lastView, setLastView] = useState(localStorage.getItem("lastView")||"week");
  const [currentDate, setCurrentDate] = useState(new Date()); //NO SE EXPLICA, HAY QUE BUSCAR EN DOCUMENTACION DE BIGCALENDAR
  const {openModal}= useOpenModal();
  const {eventos, activarEvento,startObtenerEventos} = useCalendarioStore();
  
 
  
  
  const eventStyleGetter= (event, start, end, isSelected, )=>{
  
  const miEvento = (user.uid === event.user.uid || user.uid === event.user._id );
  const style = {
      backgroundColor: miEvento ? "#347Cf7" : "#f734c3ff",
      borderRadius: "0px",
      opacity:0.8,
      color: "white",

    }
    return { style } 

  }

  
  
  const onClickEvent=(event)=>{
    activarEvento(event);
    //console.log({click:event});
  }

  const onDoubleClickEvent=(event)=>{
    //console.log({doubleClick:event});
    openModal();
  }

  const onChangeView=(view)=>{
    localStorage.setItem("lastView",view);
    setLastView(view);

  }

   useEffect(() => {
    
    startObtenerEventos();
  }, [])
  
   return (
    <>
      <NavBar/>

       <Calendar
      culture='es'
      localizer={localizer}
      events={eventos}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      date={ currentDate }
      view={ lastView }
      onNavigate={ setCurrentDate }
      style={{ height: 500 }}
      messages={getMessages()}
      eventPropGetter={eventStyleGetter}
      components={{event:CalendarEvent}}
      onDoubleClickEvent={onDoubleClickEvent}
      onSelectEvent={onClickEvent}
      onView={onChangeView}
    />
    
    <CalendarModal/>
     <BotonNuevoEvento/>
     <BotonEliminarEvento/>
    </>
   
  )
}
