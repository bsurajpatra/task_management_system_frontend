import './tasks.css'
import { useState } from 'react'
import TaskLists from './TaskLists.jsx'
import Tasks from './Tasks.jsx'

export default function TasksPage() {
  const [selectedList, setSelectedList] = useState(null)
  return (
    <section className="tasks-page">
      <div className="block">
        <TaskLists onOpenList={(l) => setSelectedList(l)} />
      </div>

      {selectedList && (
        <div className="modal-overlay" onClick={() => setSelectedList(null)}>
          <div className="modal modal-wide" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: 4 }}>Tasks in “{selectedList.name}”</h3>
            <p style={{ marginTop: 0, color: 'var(--color-gray-600)' }}>Showing tasks belonging to this list.</p>
            <div style={{ marginTop: 'var(--spacing-lg)' }}>
              <Tasks taskListId={selectedList.id} compact />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}


