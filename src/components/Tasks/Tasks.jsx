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
        <h3 style={{ margin: 0 }}>Tasks</h3>
        <div className="inline-form">
          <button className="primary" onClick={() => setShowAdd(true)}>Add task</button>
        </div>
      </div>

      <div className="inline-form" style={{ marginTop: 10, display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0,1fr))' }}>
        <input name="page" type="number" min="0" value={filters.page} onChange={updateFilterField} placeholder="Page" />
        <input name="size" type="number" min="1" value={filters.size} onChange={updateFilterField} placeholder="Size" />
        <select name="priority" value={filters.priority} onChange={updateFilterField}>
          <option value="">All priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <select name="status" value={filters.status} onChange={updateFilterField}>
          <option value="">All status</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <input type="date" name="dueOn" value={filters.dueOn} onChange={updateFilterField} />
        <select name="overdue" value={filters.overdue} onChange={updateFilterField}>
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
              <tr key={t.id} style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                <td>{t.title}</td>
                <td style={{ color: '#6b7280' }}>{t.description}</td>
                <td>{t.priority}</td>
                <td>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <input type="checkbox" checked={t.status === 'COMPLETED'} onChange={(e) => toggleComplete(t.id, e.target.checked)} />
                    {t.status}
                  </label>
                </td>
                <td>{t.dueOn || '-'}</td>
                <td>{t.taskList?.name || '-'}</td>
                <td style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => updateTask({ ...t, title: prompt('Title', t.title) || t.title })}>Edit</button>
                  <button onClick={() => deleteTask(t.id)} className="danger">Delete</button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr><td colSpan={7} style={{ color: '#6b7280', padding: '8px 0' }}>No tasks found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add task</h3>
            <form onSubmit={createTask} className="modal-form">
              <input name="title" value={creating.title} onChange={updateCreatingField} placeholder="Title" required />
              <textarea name="description" value={creating.description} onChange={updateCreatingField} placeholder="Description" style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.15)' }} />
              <div className="modal-row">
                <select name="priority" value={creating.priority} onChange={updateCreatingField}>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
                <input type="date" name="dueOn" value={creating.dueOn} onChange={updateCreatingField} />
              </div>
              <select name="taskListId" value={creating.taskListId} onChange={updateCreatingField}>
                <option value="">No list</option>
                {lists.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Adding…' : 'Add task'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


