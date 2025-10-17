import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

export default function GuestGuard() {
  const { isAuthenticated } = useAuthContext()


  if (isAuthenticated) {
    return <Navigate to='/' />
  } else {
    return <Outlet />
  }

}