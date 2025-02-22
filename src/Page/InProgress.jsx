import React, { useContext, useEffect, useState } from 'react';
import TaskCard from '../Components/TaskCard';
import { useFetchData } from '../hooks/useFetchData';
import { contextData } from '../Contex';
import InProgressxxx from './InProgressxxx';
import { DndContext } from '@dnd-kit/core';

const InProgress = () => {
  const { user } = useContext(contextData);
  const email = user?.email;

  // Always call the hook outside of the conditional
  const { data, isLoading, error } = useFetchData(`http://localhost:5000/tasksPerson?email=${email}`);
  // console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks: {error.message}</div>;

  // Filter tasks in 'In Progress' category
  const filteredTasks = data?.filter(inProgress => inProgress.category === 'In Progress');

  // If there are no tasks available after filtering
  if (!filteredTasks || filteredTasks.length === 0) {
    return <div>No task available.</div>;
  }






  const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      if (data && Array.isArray(data)) {
        setTasks(filteredTasks);
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
    <InProgressxxx data={tasks} />
  </DndContext>
  );
};

export default InProgress;
