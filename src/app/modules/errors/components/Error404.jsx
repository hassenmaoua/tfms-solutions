import React from 'react';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../assets/helpers';

const Error404 = () => {
  return (
    <main className='min-h-screen flex justify-center items-center bg-white dark:bg-gray-900'>
      <div className='flex flex-col items-center'>
        <img
          src={toAbsoluteUrl('/media/backgrounds/404-not-found.svg')}
          alt='404-not-found.svg'
          className='h-[400px] w-[400px]'
        />
        <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl'>
          Page non trouvée
        </h1>
        <p className='mt-6 text-base leading-7 text-gray-600 dark:text-gray-400'>
          Désolé, nous n'avons pas pu trouver la page que vous recherchez.
        </p>
        <div className='mt-8 flex items-center justify-center gap-x-6'>
          <Link
            to='/'
            className='rounded-md bg-primary-600 dark:bg-primary-400 px-3.5 py-2.5 text-sm font-semibold text-white dark:text-gray-900 shadow-sm hover:bg-primary-500 dark:hover:bg-primary-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
          >
            Retourner à la page d'accueil
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Error404;
