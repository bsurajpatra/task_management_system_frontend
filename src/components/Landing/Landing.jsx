import './landing.css'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <section className="landing">
      <div className="hero">
        <h1>Manage tasks with clarity</h1>
        <p className="sub">Simple, fast, and focused task management for your day.</p>
        <div className="cta">
          <Link className="btn primary" to="/signup">Get started</Link>
        </div>
      </div>
      <div className="preview">
        <div className="card">
          <div className="line" />
          <div className="line short" />
          <div className="line" />
          <div className="line short" />
        </div>
      </div>
    </section>
  )
}


