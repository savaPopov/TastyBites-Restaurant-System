import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

export default function UserGuard() {
  const { isAuthenticated, role } = useAuthContext()

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }


  if (role !== 'USER') {
    return <Navigate to='/' />
  }


  return <Outlet />
}