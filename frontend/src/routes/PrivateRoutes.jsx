import { Outlet, Navigate } from 'react-router-dom'

export function PrivateRoutes() {
  return localStorage.getItem('token') ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoutes
