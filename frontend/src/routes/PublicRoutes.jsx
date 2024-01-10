import {
    Outlet,
    Navigate
  } from 'react-router-dom'

  export function PublicRoutes() {
    return (
      localStorage.getItem('token') ? <Navigate to='/' replace/> : <Outlet />
    )
  }

  export default PublicRoutes
