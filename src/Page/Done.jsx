import React, { useContext } from 'react'
import { useFetchData } from '../hooks/useFetchData';
import { contextData } from '../Contex';
import TaskCard from '../Components/TaskCard';

const Done = () => {
   const { user } = useContext(contextData);
    const email = user?.email;
  
    // Always call the hook outside of the conditional
    const { data, isLoading, error } = useFetchData(`http://localhost:5000/tasksPerson?email=${email}`);
    console.log(data);
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading tasks: {error.message}</div>;
  
    // Filter tasks in 'In Progress' category
    const filteredTasks = data?.filter(done => done.category === 'Done');
  
    // If there are no tasks available after filtering
    if (!filteredTasks || filteredTasks.length === 0) {
      return <div>No task available.</div>;
    }

  return (
    <div>
      {filteredTasks.map(task => (
        <TaskCard key={task._id} task={task}></TaskCard>
      ))}
    </div>
  )
}

export default Done
