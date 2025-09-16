import { useState } from 'react'
import './auth.css'

export default function Signup() {
  const [form, setForm] = useState({ fullName: '', email: '', username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Signup failed')
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

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="auth">
      <h2>Create your account</h2>
      {error && <div className="alert">{error}</div>}
      <form onSubmit={handleSubmit} className="panel">
        <label>
          <span>Full name</span>
          <input name="fullName" value={form.fullName} onChange={updateField} placeholder="John Doe" required />
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email" value={form.email} onChange={updateField} placeholder="john@example.com" required />
        </label>
        <label>
          <span>Username</span>
          <input name="username" value={form.username} onChange={updateField} placeholder="johndoe" required />
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password" value={form.password} onChange={updateField} placeholder="••••••••" required />
        </label>
        <button disabled={loading}>{loading ? 'Creating...' : 'Sign up'}</button>
      </form>
      <p style={{ marginTop: 10, textAlign: 'center' }}>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  )
}


