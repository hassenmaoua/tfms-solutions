import React from 'react';
import { toAbsoluteUrl } from '../../helpers';
import MenuItem from './header/MenuItem';
import HeaderUserMenu from './header/HeaderUserMenu';

const Navbar = () => {
  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-800 sticky top-0 z-50 shadow-sm select-none '>
      <div className='flex flex-wrap items-center justify-between mx-auto py-2 px-10'>
        <div className='flex items-center w-[250px] select-none'>
          <img
            src={toAbsoluteUrl('/media/logos/logo.png')}
            className='h-12 mr-2'
            alt='TFMS Solution Logo'
          />
          <span className='text-gray-600 dark:text-gray-300 font-semibold'>
            TFMS Solutions
          </span>
        </div>

        <div
          className='items-center justify-between hidden w-full md:flex md:w-auto'
          id='mobile-menu-2'
        >
          <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 mr-5'>
            <MenuItem to='/home' title='Home' />
            <MenuItem to='/activites' title='Activites' />
            <MenuItem to='/clients' title='Clients' />
            <MenuItem to='/documents' title='Documents' />
          </ul>
        </div>
        <HeaderUserMenu />
      </div>
    </nav>
  );
};

export default Navbar;
