import { useEffect, useMemo, useState } from 'react'
import { apiRequest, buildQuery } from '../../lib/api.js'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [lists, setLists] = useState([])
  const [filters, setFilters] = useState({ page: 0, size: 20, priority: '', status: '', dueOn: '', overdue: '', taskListId: '' })
  const [creating, setCreating] = useState({ title: '', description: '', priority: 'MEDIUM', dueOn: '', taskListId: '' })
  const [showAdd, setShowAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function loadTasks() {
    setError('')
    const qs = buildQuery(filters)
    try {
      const data = await apiRequest(`/api/tasks${qs}`, { method: 'GET' })
      setTasks(Array.isArray(data?.content) ? data.content : Array.isArray(data) ? data : [])
    } catch (e) { setError(e.message) }
  }

  async function loadLists() {
    try { const data = await apiRequest('/api/task-lists', { method: 'GET' }); setLists(Array.isArray(data) ? data : []) } catch {}
  }

  useEffect(() => { loadLists() }, [])
  useEffect(() => { loadTasks() }, [JSON.stringify(filters)])

  async function createTask(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await apiRequest('/api/tasks', { method: 'POST', body: creating })
      setCreating({ title: '', description: '', priority: 'MEDIUM', dueOn: '', taskListId: '' })
      await loadTasks()
      setShowAdd(false)
    } catch (e) { setError(e.message) } finally { setLoading(false) }
  }

  async function updateTask(task) {
    try { await apiRequest(`/api/tasks/${task.id}`, { method: 'PUT', body: task }); await loadTasks() } catch (e) { setError(e.message) }
  }
  async function deleteTask(id) {
    try { await apiRequest(`/api/tasks/${id}`, { method: 'DELETE' }); await loadTasks() } catch (e) { setError(e.message) }
  }
  async function toggleComplete(id, completed) {
    try { await apiRequest(`/api/tasks/${id}/complete?completed=${completed}`, { method: 'PATCH' }); await loadTasks() } catch (e) { setError(e.message) }
  }

  function updateFilterField(e) { setFilters({ ...filters, [e.target.name]: e.target.value }) }
  function updateCreatingField(e) { setCreating({ ...creating, [e.target.name]: e.target.value }) }

  return (
    <div>
      <div className="section-header">
        <h3>Tasks</h3>
        <div className="inline-form">
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add task
          </button>
        </div>
      </div>

      <div className="inline-form" style={{ marginTop: 'var(--spacing-lg)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--spacing-md)' }}>
        <select className="form-select" name="priority" value={filters.priority} onChange={updateFilterField}>
          <option value="">All priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <select className="form-select" name="status" value={filters.status} onChange={updateFilterField}>
          <option value="">All status</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <input className="form-input" type="date" name="dueOn" value={filters.dueOn} onChange={updateFilterField} />
        <select className="form-select" name="overdue" value={filters.overdue} onChange={updateFilterField}>
          <option value="">Overdue?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      {error && <div className="alert" style={{ marginTop: 8 }}>{error}</div>}

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr style={{ textAlign: 'left' }}>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Due</th>
              <th>List</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(t => (
              <tr key={t.id}>
                <td>
                  <div style={{ fontWeight: '600', color: 'var(--color-gray-900)' }}>{t.title}</div>
                </td>
                <td style={{ color: 'var(--color-gray-600)' }}>{t.description || '-'}</td>
                <td>
                  <span className={`priority-badge ${t.priority.toLowerCase()}`}>
                    {t.priority}
                  </span>
                </td>
                <td>
                  <div className="checkbox-wrapper">
                    <input 
                      type="checkbox" 
                      checked={t.status === 'COMPLETED'} 
                      onChange={(e) => toggleComplete(t.id, e.target.checked)} 
                    />
                    <span className={`status-badge ${t.status.toLowerCase()}`}>
                      {t.status}
                    </span>
                  </div>
                </td>
                <td style={{ color: 'var(--color-gray-600)' }}>{t.dueOn || '-'}</td>
                <td style={{ color: 'var(--color-gray-600)' }}>{t.taskList?.name || '-'}</td>
                <td>
                  <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => updateTask({ ...t, title: prompt('Title', t.title) || t.title })}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteTask(t.id)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={7} style={{ 
                  color: 'var(--color-gray-500)', 
                  padding: 'var(--spacing-2xl)', 
                  textAlign: 'center',
                  fontStyle: 'italic'
                }}>
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add task</h3>
            <form onSubmit={createTask} className="modal-form">
              <input 
                className="form-input" 
                name="title" 
                value={creating.title} 
                onChange={updateCreatingField} 
                placeholder="Task title" 
                required 
              />
              <textarea 
                className="form-textarea" 
                name="description" 
                value={creating.description} 
                onChange={updateCreatingField} 
                placeholder="Task description (optional)" 
                rows="3"
              />
              <div className="modal-row">
                <select className="form-select" name="priority" value={creating.priority} onChange={updateCreatingField}>
                  <option value="LOW">Low Priority</option>
                  <option value="MEDIUM">Medium Priority</option>
                  <option value="HIGH">High Priority</option>
                </select>
                <input className="form-input" type="date" name="dueOn" value={creating.dueOn} onChange={updateCreatingField} />
              </div>
              <select className="form-select" name="taskListId" value={creating.taskListId} onChange={updateCreatingField}>
                <option value="">No list</option>
                {lists.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
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
                      Add task
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


