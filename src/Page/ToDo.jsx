import React, { useContext } from 'react'
import { useFetchData } from '../hooks/useFetchData';
import { contextData } from '../Contex';
import TaskCard from '../Components/TaskCard';

const ToDo = () => {
  const { user } = useContext(contextData);
  const email = user?.email;

  // Always call the hook outside of the conditional
  const { data, isLoading, error } = useFetchData(`http://localhost:5000/tasksPerson?email=${email}`);
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (!data || data.length === 0) {
    return <div>No tasks available.</div>;
  }
  if (error) return <div>Error loading tasks: {error.message}</div>;

  return (
    <div>
      {data && data.filter(toDo => toDo.category === 'To-Do').map(task => (
        <TaskCard key={task._id} task={task}></TaskCard>
      ))}
    </div>
  )
}

export default ToDo;
