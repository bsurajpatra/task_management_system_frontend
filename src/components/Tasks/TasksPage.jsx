import './tasks.css'
import TaskLists from './TaskLists.jsx'
import Tasks from './Tasks.jsx'

export default function TasksPage() {
  return (
    <section className="tasks-page">
      <div className="block">
        <TaskLists />
      </div>
      <div className="block">
        <Tasks />
      </div>
    </section>
  )
}


