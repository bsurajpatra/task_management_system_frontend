import './dashboard.css'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const username = localStorage.getItem('username') || 'User'
  const userInitial = username.charAt(0).toUpperCase()

  return (
    <section className="dashboard">
      <div className="welcome-section">
        <div className="user-avatar">{userInitial}</div>
        <h2>Welcome back, {username}!</h2>
        <p style={{ color: 'var(--color-gray-600)', fontSize: '1rem', margin: 0 }}>
          Ready to tackle your tasks? Let's get organized and productive today.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">0</div>
          <div className="stat-label">Active Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">0</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">0</div>
          <div className="stat-label">Task Lists</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">0</div>
          <div className="stat-label">Overdue</div>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h3>Quick Start Guide</h3>
          <ul>
            <li>Create your first task list to organize your work</li>
            <li>Add tasks with priorities and due dates</li>
            <li>Use filters to find what matters most</li>
            <li>Track your progress and stay productive</li>
          </ul>
          <Link to="/tasks">
            <button className="primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4"></path>
                <rect x="9" y="11" width="6" height="11"></rect>
                <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
              </svg>
              Open Tasks
            </button>
          </Link>
        </div>

        <div className="card">
          <h3>Productivity Tips</h3>
          <ul>
            <li>Break large tasks into smaller, manageable pieces</li>
            <li>Set realistic deadlines and stick to them</li>
            <li>Review and update your tasks regularly</li>
            <li>Use the priority system to focus on what's important</li>
          </ul>
          <div style={{ 
            background: 'var(--color-primary-light)', 
            padding: 'var(--spacing-lg)', 
            borderRadius: 'var(--radius-lg)', 
            marginTop: 'var(--spacing-lg)',
            border: '1px solid var(--color-primary)'
          }}>
            <p style={{ 
              margin: 0, 
              fontSize: '0.875rem', 
              color: 'var(--color-primary)', 
              fontWeight: '600' 
            }}>
              💡 Pro tip: Start your day by reviewing your highest priority tasks!
            </p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/tasks" style={{ textDecoration: 'none' }}>
          <div className="action-card">
            <div className="action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4"></path>
                <rect x="9" y="11" width="6" height="11"></rect>
                <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
              </svg>
            </div>
            <h4>Manage Tasks</h4>
            <p>Create, organize, and track your tasks efficiently</p>
          </div>
        </Link>

        <div className="action-card" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
          <div className="action-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3h18v18H3zM21 9H3M21 15H3"></path>
            </svg>
          </div>
          <h4>Analytics</h4>
          <p>Coming soon - Track your productivity trends</p>
        </div>

        <div className="action-card" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
          <div className="action-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
            </svg>
          </div>
          <h4>Settings</h4>
          <p>Coming soon - Customize your experience</p>
        </div>
      </div>
    </section>
  )
}


