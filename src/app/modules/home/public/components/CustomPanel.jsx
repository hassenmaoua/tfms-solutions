import React from 'react';
import { toAbsoluteUrl } from '../../../../../assets/helpers';

const CustomPanel = ({ label, src, desc }) => {
  return (
    <div className='h-full w-full flex'>
      <div className='flex flex-col items-center justify-center w-1/2 sm:px-8 xl:px-16'>
        <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-5xl dark:text-gray-200'>
          {label}
        </h1>
        <p className='text-justify mb-6 text-lg font-normal text-gray-500 dark:text-gray-400'>
          {desc}
        </p>
      </div>
      <div className='w-1/2 flex flex-col items-center justify-center'>
        <img className='w-[500px]' alt='Storyset' src={toAbsoluteUrl(src)} />
      </div>
    </div>
  );
};

export default CustomPanel;
