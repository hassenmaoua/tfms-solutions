import React from 'react';
import { toAbsoluteUrl } from '../../../../assets/helpers';
import { Link } from 'react-router-dom';

const Header = ({ className }) => {
  return (
    <nav
      className={`${className} shadow-sm bg-white dark:bg-gray-900 fixed w-full z-50 top-0 left-0 border-b border-gray-200 dark:border-gray-600`}
    >
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2'>
        <Link to='/' className='flex items-center'>
          <img
            src={toAbsoluteUrl('/media/logos/logo.png')}
            className='h-12 mr-3'
            alt='Flowbite Logo'
          />
        </Link>
        <div className='flex md:order-2'>
          <Link
            to='/auth/register'
            className='text-primary-600 bg-white hover:bg-primary-700 hover:text-white font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-800 dark:hover:bg-primary-700 mr-2'
          >
            Register
          </Link>
          <Link
            to='/auth/login'
            className='text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700'
          >
            Login
          </Link>
        </div>
        <div
          className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
          id='navbar-sticky'
        >
          <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            <li>
              <span className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 md:dark:hover:text-primary-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:cursor-pointer'>
                À propos
              </span>
            </li>
            <li>
              <span className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 md:dark:hover:text-primary-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:cursor-pointer'>
                Services
              </span>
            </li>
            <li>
              <span className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0 md:dark:hover:text-primary-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:cursor-pointer'>
                Contact
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
