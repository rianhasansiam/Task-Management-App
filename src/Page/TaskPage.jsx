import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { contextData } from '../Contex';
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
import auth from '../Security/Firebase';

const TaskPage = (props) => {

  // const { signoutHandle } = useContext(contextData);

  const navigate= useNavigate()

  const signoutHandle = () => {




    signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("User signed out successfully.");
      Swal.fire({
        icon: 'info',
        title: 'Signed Out',
        text: 'You have been signed out successfully!',
        confirmButtonText: 'OK',
      });


      navigate('/')

    })
    .catch((error) => {
      // An error happened.
      console.error("Error signing out:", error);
    });




  };



  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-white shadow-md p-4 space-y-6">
        <div className="font-semibold text-2xl text-center md:text-left">Task Manager</div>
        
        <nav className="space-y-4 flex flex-col">
          <NavLink
            to="/taskPage/taskHome/alltasks"
            className="text-center  py-2 rounded-md text-lg font-semibold "
          >
            🏠 Home
          </NavLink>

          <NavLink
            to="/taskPage/taskAdd"
            className="text-center  py-2 rounded-md text-lg font-semibold"
          >
            📋 Add Task
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto ">
     
        <header className=" flex justify-between lg:px-10">

          <div className='text-center md:text-left'>

          <h1 className="text-2xl md:text-3xl font-bold">Design System</h1>
          <p className="text-gray-500">Create a component library for our products</p>
          </div>


          <button onClick={signoutHandle} className='btn bg-[#ee185cc4] text-white'>Logout</button>
        </header>

        <Outlet />

        {/* Add any additional content/components here */}
      </div>
    </div>
  );
};

TaskPage.propTypes = {};

export default TaskPage;
