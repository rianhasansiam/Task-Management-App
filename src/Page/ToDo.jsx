import React, { useContext, useEffect, useState } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import { contextData } from '../Contex';
import ToDoxxx from './ToDoxxx'; // Assuming this component displays the tasks
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useUpdateData } from '../hooks/useUpdateData';

const ToDo = () => {
  const { user } = useContext(contextData);
  const email = user?.email;

  // Fetch tasks from the backend for the specific user
  const { data, isLoading, error } = useFetchData(`http://localhost:5000/tasksPerson?email=${email}`);
   const { mutate: updateTask, isLoading: isUpdating, isError, isSuccess } = useUpdateData('http://localhost:5000/inProgress/reorder');
  // console.log(isError)

  // State to store filtered tasks in 'To-Do' category
  const [tasks, setTasks] = useState([]);

  // Filter tasks in the 'To-Do' category when data is available
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filteredTasks = data.filter((task) => task.category === 'To-Do');
      setTasks(filteredTasks);
    }
  }, [data]);

  // Set up drag-and-drop sensors
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

  // Function to get task position by its ID
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
 
       // Update the order on the server by sending the reordered array
       updateTask(reorderedTasks);  // Call the mutation to update the task order in the backend
 
       return reorderedTasks;
     });
   };



  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks: {error.message}</div>;
  if (!data || data.length === 0) return <div>No tasks available.</div>;

  return (
    <div>
      {/* Drag-and-drop context for the To-Do tasks */}
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <ToDoxxx data={tasks} /> {/* Display the tasks with the ToDoxxx component */}
      </DndContext>
    </div>
  );
};

export default ToDo;
