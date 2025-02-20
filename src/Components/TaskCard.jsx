import React from 'react'
import PropTypes from 'prop-types'

const TaskCard = ({ task, onMove, onDelete }) => {
  return (
    <div className="bg-gray-100 p-4 rounded mb-3 flex justify-between items-center">
    <span>{task.text}</span>
    <div className="flex space-x-2">
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded"
        onClick={() => onMove(task, 'inProgress')}
      >
        In Progress
      </button>
      <button
        className="bg-green-500 text-white px-2 py-1 rounded"
        onClick={() => onMove(task, 'done')}
      >
        Done
      </button>
      <button
        className="bg-red-500 text-white px-2 py-1 rounded"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  </div>
  )
}

TaskCard.propTypes = {}

export default TaskCard