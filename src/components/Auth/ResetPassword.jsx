import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import './auth.css'
import { resetPassword } from '../../lib/api.js'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [token, setToken] = useState('')

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token')
    if (tokenFromUrl) {
      setToken(tokenFromUrl)
    } else {
      setError('Invalid or missing reset token')
    }
  }, [searchParams])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    
    setLoading(true)
    try {
      await resetPassword(token, form.password)
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  if (success) {
    return (
      <div className="auth">
        <div className="panel" style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            background: 'var(--color-success-light)', 
            color: 'var(--color-success)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 16px',
            fontSize: '24px'
          }}>
            ✓
          </div>
          <h2 style={{ color: 'var(--color-success)', marginBottom: '8px' }}>Password Reset Successful!</h2>
          <p style={{ color: 'var(--color-gray-600)', marginBottom: '16px' }}>
            Your password has been successfully updated. You will be redirected to the login page shortly.
          </p>
          <button 
            onClick={() => navigate('/login')}
            style={{ background: 'var(--color-primary)', color: 'white' }}
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="auth">
      <h2>Reset your password</h2>
      <p style={{ color: 'var(--color-gray-600)', marginBottom: '16px', textAlign: 'center' }}>
        Enter your new password below
      </p>
      
      {error && <div className="alert">{error}</div>}
      
      <form onSubmit={handleSubmit} className="panel">
        <label>
          <span>New Password</span>
          <input 
            type="password" 
            name="password" 
            value={form.password} 
            onChange={updateField} 
            placeholder="••••••••" 
            required 
            minLength="6"
          />
        </label>
        <label>
          <span>Confirm Password</span>
          <input 
            type="password" 
            name="confirmPassword" 
            value={form.confirmPassword} 
            onChange={updateField} 
            placeholder="••••••••" 
            required 
            minLength="6"
          />
        </label>
        <button disabled={loading || !token}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      
      <p style={{ marginTop: 10, textAlign: 'center' }}>
        Remember your password? <a href="/login">Log in</a>
      </p>
    </div>
  )
}
