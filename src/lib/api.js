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

// Authentication API functions
export async function login(credentials) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
  if (!res.ok) throw new Error('Invalid credentials')
  return res.json()
}

export async function signup(userData) {
  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  if (!res.ok) throw new Error('Signup failed')
  return res.json()
}

export async function forgotPassword(email) {
  const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
  if (!res.ok) throw new Error('Failed to send reset email')
  return res.json()
}

export async function resetPassword(token, newPassword) {
  const res = await fetch(`${BASE_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword })
  })
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Failed to reset password')
  }
  return res.json()
}

// Tasks API helpers
export async function setTaskDueDate(taskId, dueDate) {
  // Use apiRequest to ensure Authorization header and error handling are consistent
  return apiRequest(`/api/tasks/${taskId}/due-date`, {
    method: 'PATCH',
    body: { dueDate }
  })
}


