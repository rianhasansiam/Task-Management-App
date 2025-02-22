import React, { useContext, useEffect, useState } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import { contextData } from '../Contex';
import InProgressxxx from './InProgressxxx';
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core'; 
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'; // To handle reordering
import { useUpdateData } from '../hooks/useUpdateData';

const InProgress = () => {
  const { user } = useContext(contextData);
  const email = user?.email;

  // Fetch tasks data
  const { data, isLoading, error } = useFetchData(`http://localhost:5000/tasksPerson?email=${email}`);
  const { mutate: updateTask, isLoading: isUpdating, isError, isSuccess } = useUpdateData('http://localhost:5000/inProgress/reorder');
console.log(isError)
  const [tasks, setTasks] = useState([]);

  // Filter tasks in 'In Progress' category and set the state
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filteredTasks = data.filter(task => task.category === 'In Progress');
      setTasks(filteredTasks);
    }
  }, [data]);

  // DnD Sensors
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

  // Handle task drag and drop
  const getTaskPos = (id) => tasks.findIndex((task) => task._id === id);

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

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error fetching tasks: {error.message}</div>;
  if (!tasks || tasks.length === 0) return <div>No tasks available.</div>;

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <InProgressxxx data={tasks} />
    </DndContext>
  );
};

export default InProgress;
