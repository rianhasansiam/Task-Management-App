import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task?._id });

  const style = {
    transition,
    transform: transform ? CSS.Transform.toString(transform) : undefined,
  };

  const onEdit = () => {
    console.log('Editing task:', task?._id);
    // Implement real edit functionality here
  };

  const onDelete = () => {
    console.log('Deleting task:', task?._id);
    // Implement real delete functionality here
  };

  // Format the task date
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
      {...attributes}
      {...listeners}
      style={style}
      className="max-w-md mx-auto my-4 p-4 bg-white shadow-lg rounded-lg border border-gray-200"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">{task?.title || 'Untitled Task'}</h2>
        <div className="flex space-x-2">
          <button onClick={onEdit} className="text-blue-500 hover:text-blue-600">
            <PencilIcon className="h-6 w-6" />
          </button>
          <button onClick={onDelete} className="text-red-500 hover:text-red-600">
            <TrashIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      <p className="text-gray-600 mt-2 w-[95%] overflow-auto">{task?.description || 'No description available.'}</p>
      <div className="mt-4 text-sm text-gray-500">
        Category: <span className="font-medium">{task?.category || 'Uncategorized'}</span>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Date: <span className="font-medium">{formattedDate}</span>
      </div>
    </div>
  );
};

export default TaskCard;
