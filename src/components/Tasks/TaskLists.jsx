import { useEffect, useState } from 'react'
import { apiRequest } from '../../lib/api.js'

export default function TaskLists() {
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
        <h3 style={{ margin: 0 }}>Task Lists</h3>
        <div className="inline-form">
          <button className="primary" onClick={() => setShowAdd(true)}>Add list</button>
        </div>
      </div>
      {error && <div className="alert" style={{ marginTop: 8 }}>{error}</div>}
      <ul className="list">
        {lists.map((l) => (
          <li key={l.id} className="list-item">
            <EditableText text={l.name} onSave={(t) => updateList(l.id, t)} />
            <button onClick={() => removeList(l.id)} className="danger">Delete</button>
          </li>
        ))}
        {lists.length === 0 && <li style={{ color: '#6b7280' }}>No lists yet</li>}
      </ul>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add list</h3>
            <form onSubmit={createList} className="modal-form">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New list name" autoFocus required />
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Adding…' : 'Add list'}</button>
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
  if (!editing) return <span onClick={() => setEditing(true)} style={{ cursor: 'text' }}>{text}</span>
  return (
    <form onSubmit={(e) => { e.preventDefault(); setEditing(false); if (value !== text) onSave(value) }} style={{ display: 'flex', gap: 6 }}>
      <input value={value} onChange={(e) => setValue(e.target.value)} autoFocus />
      <button type="submit">Save</button>
    </form>
  )
}


