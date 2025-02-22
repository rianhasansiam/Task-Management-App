import React, { useContext, useState, useEffect } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import { contextData } from '../Contex';
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensors, useSensor } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import AllTasksxxx from './AllTasksxxx';

const AllTasks = () => {
  const { user } = useContext(contextData);
  const email = user?.email;
  const { data, isLoading, error } = useFetchData(`http://localhost:5000/tasksPerson?email=${email}`);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setTasks(data);
    }
  }, [data]);

  // Always call hooks before any conditional returns
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







  const getTaskPos = (id) => tasks.findIndex((task) => task._id === id);

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
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <AllTasksxxx data={tasks} />
    </DndContext>
  );
};

export default AllTasks;
