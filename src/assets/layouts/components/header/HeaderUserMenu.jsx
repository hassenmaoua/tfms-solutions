import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl, toApiUrl } from '../../../helpers/AssetsHelpers';
import SVG from 'react-inlinesvg';
import { useAuth } from '../../../../app/modules/auth/AuthProvider';

const HeaderUserMenu = () => {
  const { currentUser } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const date = new Date();
  const currentHour = date.getHours();

  let greeting;

  if (currentHour >= 6 && currentHour < 18) {
    greeting = 'Bonjour';
  } else {
    greeting = 'Bonsoir';
  }

  return (
    <div className='flex items-center relative '>
      <div className='mr-2 text-gray-600 dark:text-gray-300 rounded hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2'>
        <SVG src={toAbsoluteUrl('/media/icons/gen060.svg')} />
      </div>
      <span className='text-gray-600 dark:text-gray-300 mr-2 max-w-[200px] truncate'>
        {greeting}, {currentUser.name}
      </span>
      <button
        type='button'
        className='flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
        id='user-menu-button'
        aria-expanded={isDropdownOpen}
        aria-haspopup='true'
        onClick={toggleDropdown}
      >
        <span className='sr-only'>Open user menu</span>
        <img
          className='w-8 h-8 rounded-full'
          src={toApiUrl(currentUser.avatar)}
          alt='user'
        />
      </button>
      {/* Dropdown menu */}
      <div
        className={`z-50 absolute top-full right-0 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${
          isDropdownOpen ? '' : 'hidden'
        }`}
        id='user-dropdown'
      >
        <div className='px-4 py-3'>
          <span className='block text-sm text-gray-900 dark:text-white'>
            {currentUser.name}
          </span>
          <span className='block text-sm text-gray-500 truncate dark:text-gray-400'>
            {currentUser.email}
          </span>
        </div>
        <ul className='py-2' aria-labelledby='user-menu-button'>
          <li>
            <Link
              to='#'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
            >
              Parameters
            </Link>
          </li>
          <li>
            <Link
              to='/logout'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
            >
              Déconnexion
            </Link>
          </li>
        </ul>
      </div>
      <button
        type='button'
        className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
        aria-expanded={isDropdownOpen}
        onClick={toggleDropdown}
      >
        <span className='sr-only'>Open main menu</span>
        <svg
          className='w-6 h-6'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
            clipRule='evenodd'
          />
        </svg>
      </button>
    </div>
  );
};

export default HeaderUserMenu;
