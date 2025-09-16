import './dashboard.css'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const username = localStorage.getItem('username') || 'User'

  return (
    <section className="dashboard">
      <h2>Welcome, {username}</h2>
      <div className="grid">
        <div className="card">
          <h3>Next steps</h3>
          <ul>
            <li>Manage your lists and tasks in the Tasks page</li>
            <li>Use filters to find what matters</li>
          </ul>
          <Link to="/tasks" style={{ display: 'inline-block', marginTop: 8 }}>
            <button className="primary">Open Tasks</button>
          </Link>
        </div>
      </div>
    </section>
  )
}


