import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Outlet } from 'react-router-dom';

const TaskHome = (props) => {
  const [selectedTab, setSelectedTab] = useState('All Tasks');
  

  return (
    <>
      {/* Tabs */}
      <div className="flex flex-wrap space-x-2 sm:space-x-4 md:space-x-6 my-4 sm:my-6 text-sm sm:text-base md:text-lg justify-center ">
        {['All Tasks', 'To-Do', 'In Progress', 'Done'].map((tab, index) => {
          const links = [
            '/taskPage/taskHome/alltasks',
            '/taskPage/taskHome/todo',
            '/taskPage/taskHome/inprogress',
            '/taskPage/taskHome/done',
          ];
          return (
            <Link
              to={links[index]} // Assigning respective link paths
              key={tab}
              className={`pb-2 ${
                selectedTab === tab
                  ? 'border-b-2 border-blue-500 font-semibold'
                  : 'text-gray-500'
              } hover:text-blue-500`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </Link>
          );
        })}
      </div>

      <div className="divider"></div>

      
      <Outlet></Outlet>
     
    </>
  );
};

TaskHome.propTypes = {};

export default TaskHome;
