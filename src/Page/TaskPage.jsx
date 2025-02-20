import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TaskList from '../Components/TaskList';
import { Link, NavLink, Outlet } from 'react-router-dom';

const TaskPage = props => {
   

  return (
    <div className="flex h-screen bg-gray-100">





    {/* Sidebar */}
    <div className="w-1/5 bg-white shadow-md p-4 space-y-6">
      <div className="font-semibold text-lg">Task Mannager</div>
      
      
      <nav className="space-y-4 flex flex-col">
        <NavLink to='/taskPage/taskHome' className=" text-center py-2 rounded-md text-lg font-semibold ">
          🏠 Home
        </NavLink>

        <NavLink to='/taskPage/taskAdd' className="text-center py-2 rounded-md text-lg font-semibold">
          📋 Add Task
        </NavLink>

       
      </nav>




    </div>






    {/* Main Content */}
    <div className="flex-1 p-6">
      <header className="text-center">

   
          <h1 className="text-3xl font-bold">Design System</h1>
          <p className="text-gray-500">Create a component library for our products</p>
    
      
      </header>


<Outlet></Outlet>



   


{/*    
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div key={index} className="flex justify-between items-center bg-white shadow-md p-4 rounded-md">
            <div className="flex items-center space-x-4">
              <input type="checkbox" checked={parseInt(task.progress.split('/')[0]) > 0} className="h-5 w-5" />
              <span>{task.title}</span>
            </div>
            <span className="text-gray-500">{task.progress}</span>
          </div>
        ))}
      </div>


      <div className="fixed bottom-0 left-1/5 w-4/5 bg-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-400 w-12 h-12"></div>
          <div>
            <p className="font-semibold">In The Mood</p>
            <p className="text-gray-500">Glenn Miller</p>
          </div>
        </div>
        <button className="bg-blue-500 p-2 rounded-full text-white">▶️</button>
      </div>
 */}






    </div>
  </div>


  )
}

TaskPage.propTypes = {}

export default TaskPage