const BASE_URL = 'http://localhost:8080'

export function getAuthToken() {
  return localStorage.getItem('token') || ''
}

export function getUsername() {
  return localStorage.getItem('username') || ''
}

export async function apiRequest(path, { method = 'GET', headers = {}, body } = {}) {
  const token = getAuthToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    let message = 'Request failed'
    try { const err = await res.json(); message = err.message || message } catch {}
    throw new Error(message)
  }
  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) return res.json()
  return null
}

export function buildQuery(params) {
  const usp = new URLSearchParams()
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== '' && v !== null) usp.append(k, String(v))
  })
  const qs = usp.toString()
  return qs ? `?${qs}` : ''
}


