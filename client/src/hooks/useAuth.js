import { login, register, logout } from "../api/authApi";
import { useAuthContext } from "../context/AuthContext";



export function useLogin() {
  const { changeAuthState } = useAuthContext()

  async function loginHandler(email, password) {
    const result = await login(email, password)
    changeAuthState(result)

    return result
  }

  return loginHandler
}

export function useRegister() {
  const { changeAuthState } = useAuthContext()

  async function registerHandler(username, email, password) {
    const result = await register(username, email, password)

    changeAuthState(result)

    return result
  }

  return registerHandler
}

export function useLogout() {
  const { localLogout } = useAuthContext()

  async function logoutHandler() {
    await logout()
    localLogout()


  }

  return logoutHandler
}