import { createContext, useContext } from "react";
import usePersistedState from "../hooks/usePersistedState";

export const AuthContext = createContext()

export function AuthContextProvider(props) {
  const [authState, setAuthState] = usePersistedState('auth', {})

  const changeAuthState = (userData) => {

    setAuthState({
      _id: userData.id,
      email: userData.email,
      accessToken: userData.token,
      username: userData.username,
      role: userData.role
    })
  }

  const login = (userData) => {
    changeAuthState(userData)
  }

  const register = (userData) => {
    changeAuthState(userData)
  }

  const localLogout = async () => {
    setAuthState(null)
  }

  const contextData = {
    userId: authState?._id,
    email: authState?.email,
    username: authState?.username,
    role: authState?.role,
    accessToken: authState?.accessToken,
    isAuthenticated: !!authState?.accessToken, 
    changeAuthState,
    login,
    register,
    localLogout
  }

  return (
    <AuthContext.Provider value={contextData}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const authData = useContext(AuthContext)
  return authData
}