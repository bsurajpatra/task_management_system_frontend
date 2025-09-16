import { useState } from 'react'
import './auth.css'
import { Link } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [showReset, setShowReset] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetLoading, setResetLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Invalid credentials')
      const data = await res.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', form.username)
      window.location.href = '/dashboard'
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function sendReset(e) {
    e.preventDefault()
    setError('')
    setInfo('')
    if (!resetEmail) return
    setResetLoading(true)
    try {
      const res = await fetch('http://localhost:8080/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail })
      })
      if (!res.ok) throw new Error('Failed to send reset email')
      setInfo('If an account exists, a reset email has been sent')
      setShowReset(false)
      setResetEmail('')
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setResetLoading(false)
    }
  }

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="auth">
      <h2>Welcome back</h2>
      {error && <div className="alert">{error}</div>}
      {info && <div className="alert" style={{ color: '#166534', background: 'rgba(22, 101, 52, 0.12)', borderColor: 'rgba(22, 101, 52, 0.2)' }}>{info}</div>}
      <form onSubmit={handleSubmit} className="panel">
        <label>
          <span>Username</span>
          <input name="username" value={form.username} onChange={updateField} placeholder="johndoe" required />
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password" value={form.password} onChange={updateField} placeholder="••••••••" required />
        </label>
        <button disabled={loading}>{loading ? 'Signing in...' : 'Log in'}</button>
        <button onClick={(e) => { e.preventDefault(); setShowReset(true) }} style={{ marginTop: 8, background: '#3b82f6', color: '#ffffff', border: 'none' }}>Forgot password</button>
      </form>
      <p style={{ marginTop: 10 }}>No account? <Link to="/signup">Create one</Link></p>

      {showReset && (
        <div className="modal-overlay" onClick={() => setShowReset(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Reset password</h3>
            <p style={{ marginTop: 0, color: '#6b7280' }}>Enter your account email to receive a reset link.</p>
            <form onSubmit={sendReset} className="modal-form">
              <input type="email" placeholder="you@example.com" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required />
              <div className="modal-actions">
                <button type="button" onClick={() => setShowReset(false)} className="btn-secondary">Cancel</button>
                <button type="submit" disabled={resetLoading} className="btn-primary">{resetLoading ? 'Sending…' : 'Send reset link'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


