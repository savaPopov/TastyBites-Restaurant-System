import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

export default function GuestGuard() {
  const { isAuthenticated } = useAuthContext()

  console.log(` is it authenticated? ${isAuthenticated}`)
  if (isAuthenticated) {

    return <Navigate to='/menu' />
  } else {
    return <Outlet />
  }

}