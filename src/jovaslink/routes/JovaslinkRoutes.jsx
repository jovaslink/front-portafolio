import { Navigate, Route, Routes } from "react-router-dom"
import { BlogAdminPage, ProyectosAdminPage } from "../pages"


export const JovaslinkRoutes = () => {
  return (
    <>
    
    
        <Routes>
            <Route path="/inicio" element={<InicioPage/>}/>
            <Route path="/proyectos" element={<ProyectosPage/>}/>
            <Route path="/blog" element={<BlogPage/>}/>
            <Route path="/*" element={<Navigate to='/'/>}/>
        </Routes>
    
    </>
  )
}