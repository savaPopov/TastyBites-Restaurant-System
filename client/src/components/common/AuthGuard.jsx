import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

export default function AuthGuard() {
  const { isAuthenticated } = useAuthContext()


  if (!isAuthenticated) {
    return <Navigate to='/login' />
  } else {
    return <Outlet />
  }

}