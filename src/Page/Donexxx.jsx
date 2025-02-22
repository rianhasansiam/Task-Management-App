import React from 'react'
import PropTypes from 'prop-types'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TaskCard from '../Components/TaskCard'

const Donexxx = ({data = [] }) => {
  return (
    <div>
        <SortableContext items={data.map(task => task._id)} strategy={verticalListSortingStrategy}>
        {data.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </SortableContext>
    </div>
  )
}

Donexxx.propTypes = {}

export default Donexxx