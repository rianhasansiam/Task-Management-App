import React, { useState } from 'react';

const TaskAdd = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleAddTask = () => {
    // Add your logic for adding the task here
    console.log({ title, description, category });
  };

  return (
    <>
    <div className="divider"></div>
    
    <div className="max-w-2xl mx-auto mt-10">
        
      <div className="text-3xl font-bold mb-6 text-center">Add a task</div>
      <div className="space-y-6">
        
        {/* Task Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Task title
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
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a description for your task"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>

        {/* Category Selection */}
     

        {/* Add Task Button */}
        <div className="flex justify-end">
          <button
            onClick={handleAddTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default TaskAdd;
