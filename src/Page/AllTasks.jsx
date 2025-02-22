import React, { useContext, useState, useEffect } from 'react'; 
import { useFetchData } from '../hooks/useFetchData';
import { contextData } from '../Contex';
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensors, useSensor } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import AllTasksxxx from './AllTasksxxx';
import { useUpdateData } from '../hooks/useUpdateData'; // Mutation hook

const AllTasks = () => {
  const { user } = useContext(contextData);
  const email = user?.email;

  // Fetch tasks from the backend
  const { data, isLoading, error } = useFetchData(`http://localhost:5000/tasksPerson?email=${email}`);
  
  // State for tasks
  const [tasks, setTasks] = useState([]);

  // Hook to update task order on the server
  const { mutate: updateTask, isLoading: isUpdating, isError, isSuccess } = useUpdateData('http://localhost:5000/allTasks/reorder');
console.log(isError)
  // Populate the tasks from fetched data
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setTasks(data);
    }
  }, [data]);

  // Set up the drag-and-drop sensors
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

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error fetching tasks: {error.message}</div>;
  }

  if (!tasks || tasks.length === 0) {
    return <div>No tasks available.</div>;
  }

  // Get task position in the array by its ID
  const getTaskPos = (id) => tasks.findIndex((task) => task._id === id);

  // Handle drag-and-drop task reordering
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

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      {/* Pass the reordered tasks to the task list component */}
      <AllTasksxxx data={tasks} />
      {/* Optional: Add feedback messages for updating status */}
      {isUpdating && <div>Updating tasks order...</div>}
      {isError && <div>Error updating task order</div>}
      {isSuccess && <div>Tasks order updated successfully!</div>}
    </DndContext>
  );
};

export default AllTasks;
