import './landing.css'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero">
          <h1>Manage tasks with clarity</h1>
          <p className="sub">Simple, fast, and focused task management for your day. Organize your work, boost productivity, and achieve your goals with our intuitive platform.</p>
          <div className="cta">
            <Link className="btn primary" to="/signup">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4"></path>
                <rect x="9" y="11" width="6" height="11"></rect>
                <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
              </svg>
              Get started
            </Link>
            <Link className="btn" to="/login">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10,17 15,12 10,7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              Sign in
            </Link>
          </div>
        </div>
      </section>
      
      <section className="features-section">
        <div className="features">
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4"></path>
              <rect x="9" y="11" width="6" height="11"></rect>
              <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
            </svg>
          </div>
          <h3>Organize Everything</h3>
          <p>Create custom task lists and organize your work with powerful categorization tools. Keep your projects structured and your mind clear.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
            </svg>
          </div>
          <h3>Set Priorities</h3>
          <p>Focus on what matters most with our priority system. Mark tasks as high, medium, or low priority to stay on track with your goals.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h3>Track Deadlines</h3>
          <p>Never miss an important deadline again. Set due dates for your tasks and get visual reminders to keep you on schedule.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <h3>Boost Productivity</h3>
          <p>Streamline your workflow with our intuitive interface. Complete tasks faster and achieve more with less effort.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>
          <h3>Visual Progress</h3>
          <p>See your progress at a glance with our clean, modern interface. Track completed tasks and celebrate your achievements.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h3>Secure & Reliable</h3>
          <p>Your data is safe with us. We use industry-standard security measures to protect your tasks and personal information.</p>
        </div>
        </div>
      </section>
    </div>
  )
}


