import React from 'react';
import { toAbsoluteUrl } from '../../../../assets/helpers';

const Footer = ({ className }) => {
  return (
    <footer className={`${className} rounded-lg shadow dark:bg-gray-900 m-4`}>
      <div className='w-full max-w-screen-xl mx-auto px-0 py-4 md:py-8'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <div className='flex items-center mb-4 md:w-1/3 sm:mb-0'>
            <img
              src={toAbsoluteUrl('/media/logos/logo.png')}
              className='h-32 mr-3'
              alt='Flowbite Logo'
            />
          </div>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://goo.gl/maps/zuJ4Guwo6ZM3khCv9'
            className='md:w-1/3'
          >
            <img
              src={toAbsoluteUrl('/media/map.png')}
              alt='map.png'
              className='w-[400px] rounded-xl shadow-xl'
            />
          </a>
          <div className='flex flex-col items-center h-[100px] justify-between mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 md:w-1/3'>
            <div>
              <span className='text-lg font-normal mr-2'>Adresse:</span>
              <span className='text-lg font-semibold'>
                Rue de l'indépendance M'Saken 4070
              </span>
            </div>
            <div>
              <span className='text-lg font-normal mr-2'>Email:</span>
              <span className='text-lg font-semibold'>
                tfms-solution@contact.tn
              </span>
            </div>
            <div>
              <span className='text-lg font-normal mr-2'>Contact:</span>
              <span className='text-lg font-semibold'>+216 55 298 403</span>
            </div>
          </div>
        </div>
        <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
        <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          © 2023 TFMS Solutions™ Tous droits réservés.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
