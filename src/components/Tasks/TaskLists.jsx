import { useEffect, useState } from 'react'
import { apiRequest } from '../../lib/api.js'

export default function TaskLists({ onOpenList }) {
  const [lists, setLists] = useState([])
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  async function load() {
    try {
      setError('')
      const data = await apiRequest('/api/task-lists', { method: 'GET' })
      setLists(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => { load() }, [])

  async function createList(e) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    try {
      await apiRequest('/api/task-lists', { method: 'POST', body: { name } })
      setName('')
      await load()
      setShowAdd(false)
    } catch (e) {
      setError(e.message)
    } finally { setLoading(false) }
  }

  async function updateList(id, newName) {
    try {
      await apiRequest(`/api/task-lists/${id}`, { method: 'PUT', body: { name: newName } })
      await load()
    } catch (e) { setError(e.message) }
  }

  async function removeList(id) {
    try {
      await apiRequest(`/api/task-lists/${id}`, { method: 'DELETE' })
      await load()
    } catch (e) { setError(e.message) }
  }

  return (
    <div>
      <div className="section-header">
        <h3>Task Lists</h3>
        <div className="inline-form">
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add list
          </button>
        </div>
      </div>
      {error && <div className="alert" style={{ marginTop: 8 }}>{error}</div>}
      <ul className="list">
        {lists.map((l) => (
          <li key={l.id} className="list-item">
            <EditableText text={l.name} onSave={(t) => updateList(l.id, t)} />
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => onOpenList && onOpenList(l)}>
                Open
              </button>
              <button onClick={() => removeList(l.id)} className="btn btn-danger btn-sm" aria-label="Delete list">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3,6 5,6 21,6"></polyline>
                  <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                </svg>
                Delete
              </button>
            </div>
          </li>
        ))}
        {lists.length === 0 && (
          <li style={{ 
            color: 'var(--color-gray-500)', 
            padding: 'var(--spacing-xl)', 
            textAlign: 'center',
            fontStyle: 'italic',
            border: '1px dashed var(--color-gray-300)',
            borderRadius: 'var(--radius-lg)'
          }}>
            No lists yet
          </li>
        )}
      </ul>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add list</h3>
            <form onSubmit={createList} className="modal-form">
              <input 
                className="form-input" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="New list name" 
                autoFocus 
                required 
              />
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAdd(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="2" x2="12" y2="6"></line>
                        <line x1="12" y1="18" x2="12" y2="22"></line>
                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                        <line x1="2" y1="12" x2="6" y2="12"></line>
                        <line x1="18" y1="12" x2="22" y2="12"></line>
                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                      </svg>
                      Adding…
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      Add list
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function EditableText({ text, onSave }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(text)
  useEffect(() => { setValue(text) }, [text])
  
  if (!editing) {
    return (
      <span 
        onClick={() => setEditing(true)} 
        style={{ 
          cursor: 'text', 
          padding: 'var(--spacing-sm) var(--spacing-md)',
          borderRadius: 'var(--radius-sm)',
          transition: 'background-color 0.2s ease',
          display: 'inline-block',
          minWidth: '100px',
          fontWeight: '500'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-gray-100)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        {text}
      </span>
    )
  }
  
  return (
    <form 
      onSubmit={(e) => { 
        e.preventDefault(); 
        setEditing(false); 
        if (value !== text) onSave(value) 
      }} 
      style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}
    >
      <input 
        className="form-input" 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        autoFocus 
        style={{ minWidth: '150px' }}
      />
      <button type="submit" className="btn btn-primary btn-sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
        Save
      </button>
      <button 
        type="button" 
        className="btn btn-secondary btn-sm" 
        onClick={() => { setEditing(false); setValue(text) }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        Cancel
      </button>
    </form>
  )
}


