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

  const contentType = response.headers.get('content-type')
  const hasJson = contentType && contentType.includes('application/json')

  if (!hasJson) {
 
    if (response.ok) {
      return null
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
  }


  let result;
  try {
    result = await response.json()
  } catch (jsonError) {
    console.error('JSON parse error:', jsonError)
    throw new Error('Invalid JSON response from server')
  }

  if (!response.ok) {
    console.log('API error:', result)
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