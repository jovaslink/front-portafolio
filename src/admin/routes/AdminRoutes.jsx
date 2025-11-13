import { Navigate, Route, Routes } from "react-router-dom"
import { BlogAdminPage, ProyectosAdminPage } from "../pages"


export const AdminRoutes = () => {
  return (
    <>
    
    
        <Routes>
            <Route path="/proyectos-admin" element={<ProyectosAdminPage/>}/>
            <Route path="/blog-admin" element={<BlogAdminPage/>}/>
            <Route path="/*" element={<Navigate to='/admin/proyectos-admin'/>}/>
        </Routes>
    
    </>
  )
}