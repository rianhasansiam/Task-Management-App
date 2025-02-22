import React, { useContext, useEffect } from 'react';
import { contextData } from '../Contex';
import { NavLink, useNavigate } from 'react-router-dom';

const LandingPage = () => {


    const { handleLogin, user } = useContext(contextData);

    const navigate =useNavigate()

    useEffect(()=>{

      if(user){
          navigate('/taskPage/taskHome/alltasks')
            console.log(user,'kam korse')
        }
    },[user])




  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">TaskMaster</div>


          <nav className="hidden md:flex items-center font-semibold">
            {/* <NavLink  className="mx-4 text-gray-700 hover:text-blue-500">Features</NavLink>
            <NavLink className="mx-4 text-gray-700 hover:text-blue-500">Pricing</NavLink>
            <NavLink className="mx-4 text-gray-700 hover:text-blue-500">Contact</NavLink> */}
            <button onClick={handleLogin} className="bg-blue-600 text-white px-6 py-2 rounded-md ml-4 ">Get Started</button>
          </nav>


          <div className="md:hidden">





            {/* Mobile Menu Button */}
            <button className="text-gray-700 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>










      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Stay Organized with TaskMaster</h1>
          <p className="mb-8">The ultimate task management tool to boost your productivity. Add, edit, and track tasks easily!</p>
          <button onClick={handleLogin} href="#features" className="bg-white text-blue-600 px-6 py-3 rounded-md font-bold">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-blue-600">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Task Categorization</h3>
              <p>Organize your tasks into To-Do, In Progress, and Done categories with drag-and-drop functionality.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Real-Time Sync</h3>
              <p>All changes are saved instantly to the database for real-time synchronization across devices.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Simple & Clean UI</h3>
              <p>Enjoy a user-friendly, minimalistic interface that’s easy to navigate and works perfectly on mobile and desktop.</p>
            </div>
          </div>
        </div>
      </section>

    
      {/* <section id="pricing" className="py-20 bg-gray-100 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-blue-600">Pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Free</h3>
              <p className="mb-4">Basic task management features.</p>
              <p className="font-bold text-2xl mb-4">Free</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md">Sign Up</button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Pro</h3>
              <p className="mb-4">Advanced features and unlimited tasks.</p>
              <p className="font-bold text-2xl mb-4">$5/month</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md">Sign Up</button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Enterprise</h3>
              <p className="mb-4">For larger teams with custom needs.</p>
              <p className="font-bold text-2xl mb-4">Contact Us</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md">Get in Touch</button>
            </div>
          </div>
        </div>
      </section>

     
      <section id="contact" className="py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-blue-600">Get in Touch</h2>
          <p className="mb-8">Have any questions or need help? Feel free to reach out to us!</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-bold">Contact Us</button>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-4xl mx-auto text-center">
          <p>&copy; 2025 TaskMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
