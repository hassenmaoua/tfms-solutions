import React from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer/Footer';

const MasterLayout = () => {
  return (
    <div className='bg-gray-50 dark:bg-gray-900 flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex flex-1 w-full max-w-screen-xl mx-auto'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MasterLayout;
