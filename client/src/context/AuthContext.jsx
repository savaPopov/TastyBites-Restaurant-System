import { createContext, useContext, useState } from "react";
import usePersistedState from "../hooks/usePersistedState";

export const AuthContext = createContext()

export function AuthContextProvider(props) {
  const [authState, setAuthState] = usePersistedState('auth', {})
  // const [authState, setAuthState] = useState({})

  const changeAuthState = (userData) => {

    // console.log('changeAuthState: userData received:', userData);
    // console.log('changeAuthState: userData.token exists:', !!userData?.token);
    // console.log('changeAuthState: userData.token value:', userData?.token);

    setAuthState({
      _id: userData.id,
      email: userData.email,
      token: userData.token,
      username: userData.username,
      role: userData.role
    })

    console.log("USER DATA RECIEVED FROM THE SERVER")
    console.log(userData)
    console.log("USER ACCESSTOKEN:" + userData.token)


  }
  const localLogout = async () => {
    setAuthState(null)
  }

  const contextData = {
    userId: authState?._id,
    email: authState?.email,
    username: authState?.username,
    role: authState?.role,
    token: authState?.token,
    isAuthenticated: !!authState?.email,
    changeAuthState,
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