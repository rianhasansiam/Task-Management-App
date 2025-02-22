import React from 'react';
import TaskCard from '../Components/TaskCard';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';


const InProgressxxx = ({ data = [] }) => {
  return (
    <div className="">



<SortableContext items={data.map(task => task._id)} strategy={verticalListSortingStrategy}>
        
      {data.map(task => (
        <TaskCard key={task._id} task={task} />
      ))}
      </SortableContext>


      
    </div>
  );
};

export default InProgressxxx;
