import { api } from "./requester";

const BASE_URL = 'http://localhost:8080/api/auth'

export async function login(email, password) {
  const result = await api.post(`${BASE_URL}/login`, { email, password })
  // console.log("result from login")
  // console.log(result)
  return result
}

export async function register(username, email, password) {
  const result = await api.post(`${BASE_URL}/register`, { username, email, password })

  return result
}

export async function logout() {
  return api.get(`${BASE_URL}/logout`)
}

