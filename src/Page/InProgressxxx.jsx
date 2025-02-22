import React, { useContext, useEffect, useState } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import { contextData } from '../Contex';
import InProgressxxx from './InProgressxxx';
import { DndContext, closestCorners } from '@dnd-kit/core'; // Removed sensor imports
import { arrayMove } from '@dnd-kit/sortable';

const InProgress = () => {
  const { user } = useContext(contextData);
  const email = user?.email;

  // Fetch tasks data
  const { data, isLoading, error } = useFetchData(`http://localhost:5000/tasksPerson?email=${email}`);

  const [tasks, setTasks] = useState([]);

  // Filter tasks in 'In Progress' category and set the state
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filteredTasks = data.filter(task => task.category === 'In Progress');
      setTasks(filteredTasks);
    }
  }, [data]);

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error fetching tasks: {error.message}</div>;
  if (!tasks || tasks.length === 0) return <div>No tasks available.</div>;

  // Helper function to get the index of the task by ID
  const getTaskPos = (id) => tasks.findIndex((task) => task._id === id);

  // Handle drag and drop reordering
  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <InProgressxxx data={tasks} />
    </DndContext>
  );
};

export default InProgress;
