import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PencilIcon, TrashIcon, ArrowsUpDownIcon } from '@heroicons/react/16/solid';
import { useUpdateData } from '../hooks/useUpdateData';


const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task?._id });

  const { mutate: updateCategory, isLoading, isError, error } = useUpdateData(`http://localhost:5000/tasks/update-category/${task?._id}`);
  console.log(isError)

  const style = {
    transition,
    transform: transform ? CSS.Transform.toString(transform) : undefined,
  };

  const stopPropagation = (e) => {
    e.stopPropagation(); // Prevent drag-and-drop actions from blocking the button clicks
  };

  const onEdit = (e) => {
    stopPropagation(e);
    console.log('Editing task:', task?._id);
    // Implement real edit functionality here
  };

  const onDelete = (e) => {
    stopPropagation(e);
    console.log('Deleting task:', task?._id);
    // Implement real delete functionality here
  };

  const handleCategory = (e) => {

    console.log('tip lagse')
    stopPropagation(e);

    const newTask = {
      title: task?.title,
      description: task?.description,
      category: task?.category === 'To-Do'
        ? 'In Progress'
        : task?.category === 'In Progress'
        ? 'Done'
        : 'Not Found',
      name: task?.name,
      email: task?.email,
      date: new Date(),
    };

    // const API_URL = task?.category === 'To-Do'
    //   ? 'http://localhost:5000/tasks/inProgress'
    //   : task?.category === 'In Progress'
    //   ? 'http://localhost:5000/tasks/done'
    //   : 'http://localhost:5000/tasks';

      updateCategory(newTask);
  };

  const formattedDate = task?.date
    ? new Date(task?.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'No date provided';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="max-w-md mx-auto my-4 p-4 bg-white shadow-lg rounded-lg border border-gray-200"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">{task?.title || 'Untitled Task'}</h2>

        <div className="flex space-x-2">
          <button onClick={onEdit} onMouseDown={stopPropagation} className="text-blue-500 hover:text-blue-600">
            <PencilIcon className="h-6 w-6" />
          </button>
          <button onClick={onDelete} onMouseDown={stopPropagation} className="text-red-500 hover:text-red-600">
            <TrashIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <p className="text-gray-600 mt-2 w-[95%] overflow-auto">{task?.description || 'No description available.'}</p>

          <div className="mt-4 text-sm text-gray-500">
            Category: <span className="font-medium">{task?.category || 'Uncategorized'}</span>
          </div>

          <div className="mt-2 text-sm text-gray-500">
            Date: <span className="font-medium">{formattedDate}</span>
          </div>
        </div>

        <button onClick={handleCategory} onMouseDown={stopPropagation} className="btn" disabled={isLoading || task?.category === "Done"}>
          {isLoading ? 'Processing...' : task?.category === 'To-Do' ? 'Start Progress' : task?.category === 'In Progress' ? 'Task Done' : 'Task Completed'}
        </button>
      </div>

      {/* Drag handle button */}
      <div className="mt-4">
        <button
          {...attributes} // These attributes include drag events
          {...listeners}   // These listeners include mouse down, touch, etc. for dragging
          className="text-gray-500 hover:text-gray-600 flex items-center space-x-1"
        >
          <ArrowsUpDownIcon className="h-5 w-5" />
          <span>Drag</span>
        </button>
      </div>

      {isError && <div className="text-red-500">Error: {error?.message || 'Failed to update category'}</div>}
    </div>
  );
};

export default TaskCard;
