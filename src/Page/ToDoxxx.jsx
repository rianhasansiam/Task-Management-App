import React from 'react'
import PropTypes from 'prop-types'
import TaskCard from '../Components/TaskCard'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const ToDoxxx = ({data = []}) => {
  return (
    <div>
      <SortableContext items={data.map(task => task._id)} strategy={verticalListSortingStrategy}>
      {data && data.filter(toDo => toDo.category === 'To-Do').map(task => (
        <TaskCard key={task._id} task={task}></TaskCard>
      ))}
      </SortableContext>
    </div>
  )
}

ToDoxxx.propTypes = {}

export default ToDoxxx