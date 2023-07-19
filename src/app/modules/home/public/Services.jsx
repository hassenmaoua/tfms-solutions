import React from 'react';
import ModulesTabs from './components/ModulesTabs';

const Services = ({ className }) => {
  return (
    <div
      className={`${className} bg-gradient-to-r from-primary-200 to-primary-100  rounded-lg shadow dark:bg-gray-900 m-4 flex flex-wrap h-screen`}
    >
      <div className='py-8 lg:py-16 px-4 mx-auto'>
        <h2 className='mb-8 text-4xl text-center w-full tracking-tight font-extrabold text-center text-gray-700 dark:text-gray-200'>
          Découvrez nos domaines de services
        </h2>
        <ModulesTabs />
      </div>
    </div>
  );
};

export default Services;
