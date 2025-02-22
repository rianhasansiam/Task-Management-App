import React, { useContext, useEffect, useState } from 'react'
import { useFetchData } from '../hooks/useFetchData';
import { contextData } from '../Contex';
import TaskCard from '../Components/TaskCard';
import ToDoxxx from './ToDoxxx';
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

const ToDo = () => {
  const { user } = useContext(contextData);
  const email = user?.email;

  // Always call the hook outside of the conditional
  const { data, isLoading, error } = useFetchData(`http://localhost:5000/tasksPerson?email=${email}`);
  console.log(data);




 const [tasks, setTasks] = useState([]);

  // Filter tasks in 'In Progress' category and set the state
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filteredTasks = data.filter(task => task.category === 'To-Do');
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




  if (isLoading) return <div>Loading...</div>;
  if (!data || data.length === 0) {
    return <div>No tasks available.</div>;
  }
  if (error) return <div>Error loading tasks: {error.message}</div>;








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
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <ToDoxxx data={tasks} />
    </DndContext>
    </div>
  )
}

export default ToDo;
