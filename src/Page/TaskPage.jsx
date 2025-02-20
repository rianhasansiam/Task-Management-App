import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Outlet } from 'react-router-dom';

const TaskPage = (props) => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-white shadow-md p-4 space-y-6">
        <div className="font-semibold text-lg text-center md:text-left">Task Manager</div>
        
        <nav className="space-y-4 flex flex-col">
          <NavLink
            to="/taskPage/taskHome"
            className="text-center md:text-left py-2 rounded-md text-lg font-semibold"
          >
            🏠 Home
          </NavLink>

          <NavLink
            to="/taskPage/taskAdd"
            className="text-center md:text-left py-2 rounded-md text-lg font-semibold"
          >
            📋 Add Task
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <header className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold">Design System</h1>
          <p className="text-gray-500">Create a component library for our products</p>
        </header>

        <Outlet />

        {/* Add any additional content/components here */}
      </div>
    </div>
  );
};

TaskPage.propTypes = {};

export default TaskPage;
