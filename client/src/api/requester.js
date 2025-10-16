// import { getAccessToken } from "./util.js"

import { getAccessToken } from "../util"

export default async function requester(method, url, data) {
  const options = {}

  const accessToken = getAccessToken()

  if (accessToken) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`, 
    }
  }

  if (method !== 'GET') {
    options.method = method
  }

  if (data) {
    options.headers = {
      ...options.headers,
      "Content-Type": 'application/json',
    }
    options.body = JSON.stringify(data)
  }

  const response = await fetch(url, options)

  if (response.status === 204) {
    return
  }

  const result = await response.json()

  if (!response.ok) {
    console.log(result)
    throw result
  }

  return result
}

function get(url) {
  return requester('GET', url)
}

function post(url, data) {
  return requester('POST', url, data)
}

function put(url, data) {
  return requester('PUT', url, data)
}

function del(url) {
  return requester('DELETE', url)
}

export const api = {
  get,
  post,
  put,
  del
}