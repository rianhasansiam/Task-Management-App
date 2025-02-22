import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from '../Components/TaskCard';

const AllTasksxxx = ({ data = [] }) => {
  return (
    <div>
      <SortableContext items={data.map(task => task._id)} strategy={verticalListSortingStrategy}>
        {data.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};

export default AllTasksxxx;
