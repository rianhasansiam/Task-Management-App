import React, { useContext, useEffect, useState } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import { contextData } from '../Contex';
import Donexxx from './Donexxx';
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useUpdateData } from '../hooks/useUpdateData';

const Done = () => {
  const { user } = useContext(contextData);
  const email = user?.email;

  // Fetching tasks related to the user's email
  const { data, isLoading, error } = useFetchData(`http://localhost:5000/tasksPerson?email=${email}`);
  
  // Hook for updating task order
  const { mutate: updateTask, isLoading: isUpdating } = useUpdateData('http://localhost:5000/done/reorder');

  const [tasks, setTasks] = useState([]);

  // Filter tasks in 'Done' category and set the state
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filteredTasks = data.filter(task => task.category === 'Done');
      setTasks(filteredTasks);
    }
  }, [data]);

  // Define the sensors for DnD kit
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10, // Small delay for smoother dragging on touch devices
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks: {error.message}</div>;

  // If there are no tasks available after filtering
  if (!tasks || tasks.length === 0) {
    return <div>No task available.</div>;
  }

  const getTaskPos = (id) => tasks.findIndex((task) => task._id === id);

  // Handle drag-and-drop event for reordering tasks
  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    setTasks((prevTasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      // Reorder the tasks locally
      const reorderedTasks = arrayMove(prevTasks, originalPos, newPos);

      // Update the order on the server
      updateTask(reorderedTasks);  // Call the mutation to update the task order in the backend

      return reorderedTasks;
    });
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <Donexxx data={tasks} />
    </DndContext>
  );
};

export default Done;
