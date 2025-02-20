import React from 'react'
import PropTypes from 'prop-types'
import TaskCard from './TaskCard'

const TaskList = ({ tasks, title, onMove, onDelete }) => {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {tasks.map(task => (
      <TaskCard key={task.id} task={task} onMove={onMove} onDelete={onDelete} />
    ))}
  </div>
  )
}

TaskList.propTypes = {}

export default TaskList