import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

export default function AdminGuard() {
  const { isAuthenticated, role } = useAuthContext()

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }


  if (role !== 'ADMIN') {
    return <Navigate to='/' />
  }


  return <Outlet />
}