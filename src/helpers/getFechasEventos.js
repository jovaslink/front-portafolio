import { parseISO } from "date-fns";

//convertir fechas de string a Date de JS
export const getFechasEventos = (eventos) => {
  return eventos.map((e)=>{

        e.start=parseISO(e.start);
        e.end =parseISO(e.end);
        return e;
    });
}
