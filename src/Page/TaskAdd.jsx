import React, { useContext, useState } from 'react';
import { useAddData } from '../hooks/useAddData';
import { contextData } from '../Contex';
import Swal from 'sweetalert2';

const TaskAdd = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useContext(contextData);

  // Call the useAddData hook
  const { mutate: addTask, isLoading, isError, error } = useAddData();

  // Validation function for title and description
  const validateForm = () => {
    if (title.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Task title is required.',
        timer: 2000,
      });
      return false;
    }

    if (title.length > 50) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Task title cannot exceed 50 characters.',
        timer: 2000,
      });
      return false;
    }

    if (description.length > 200) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Task description cannot exceed 200 characters.',
        timer: 2000,
      });
      return false;
    }

    return true;
  };

  const handleAddTask = () => {
    // Validate before adding the task
    if (!validateForm()) return;

    // Call the mutation function with the new task data
    addTask(
      {
        title: title.trim(),
        description: description.trim(),
        category: 'To-Do', // Default category
        name: user.displayName,
        email: user.email,
        date: new Date(), // Auto-generated timestamp
      },
      {
        onSuccess: () => {
          Swal.fire({
            icon: 'success',
            title: 'Task Added',
            text: 'Your task has been added successfully!',
            showConfirmButton: false,
            timer: 1000,
            allowOutsideClick: false,
            allowEscapeKey: false,
          });

          setTitle(''); // Reset title
          setDescription(''); // Reset description
        },
        onError: () => {
          console.log(error);
        },
      }
    );
  };

  return (
    <>
      <div className="divider"></div>

      <div className="max-w-2xl mx-auto mt-10 px-4 md:px-8">
        <div className="text-2xl md:text-3xl font-bold mb-6 text-center">Add a task</div>
        <div className="space-y-6">
          
          {/* Task Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Task title (required, max 50 characters)
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write a title for your task"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Task Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description (optional, max 200 characters)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a description for your task"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              maxLength={200}
            ></textarea>
          </div>

          {/* Add Task Button */}
          <div className="flex justify-end">
            <button
              disabled={isLoading}
              onClick={handleAddTask}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              {isLoading ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskAdd;
