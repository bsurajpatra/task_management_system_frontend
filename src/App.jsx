import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import './App.css'

import Landing from './components/Landing/Landing.jsx'
import Signup from './components/Auth/Signup.jsx'
import Login from './components/Auth/Login.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import TasksPage from './components/Tasks/TasksPage.jsx'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

function App() {
  const token = localStorage.getItem('token')
  function Layout({ children }) {
    const location = useLocation()
    const hideHeaderOn = ['/', '/login', '/signup']
    const shouldHideHeader = hideHeaderOn.includes(location.pathname)

    function handleLogout() {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      window.location.href = '/'
    }

    return (
      <>
        {!shouldHideHeader && (
          <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 20px',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            background: '#ffffff',
            boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
            position: 'sticky',
            top: 0,
            backdropFilter: 'saturate(180%) blur(8px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {token && location.pathname === '/tasks' && (
                <Link to="/dashboard" style={{ 
                  background: '#6366f1', 
                  color: '#ffffff', 
                  border: 'none', 
                  padding: '10px 12px', 
                  borderRadius: 10,
                  textDecoration: 'none',
                  fontWeight: '600'
                }}>
                  Back to Dashboard
                </Link>
              )}
            </div>
            <span style={{ fontWeight: 700, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              {location.pathname === '/tasks' ? 'Personal Task Management' : 'TaskManagement'}
            </span>
            <nav style={{ display: 'flex', gap: 12 }}>
              {!token && <Link to="/">Home</Link>}
              {!token && <Link to="/signup">Sign up</Link>}
              {!token && <Link to="/login">Log in</Link>}
              {token && location.pathname !== '/dashboard' && location.pathname !== '/tasks' && <Link to="/dashboard">Dashboard</Link>}
              {token && location.pathname !== '/tasks' && <button onClick={handleLogout} style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '10px 12px', borderRadius: 10 }}>Logout</button>}
            </nav>
          </header>
        )}
        <main style={{ padding: 28, maxWidth: 1120, margin: '0 auto' }}>
          {children}
        </main>
      </>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Landing /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/dashboard" element={<Layout><PrivateRoute><Dashboard /></PrivateRoute></Layout>} />
        <Route path="/tasks" element={<Layout><PrivateRoute><TasksPage /></PrivateRoute></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
