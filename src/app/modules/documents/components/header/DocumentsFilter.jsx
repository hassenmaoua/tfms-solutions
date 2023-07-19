import React, { useState } from 'react';

const DocumentsFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [isTypeOpen, setIsTypeOpen] = useState(false);

  const toggleTypeDropdown = () => {
    setIsTypeOpen(!isTypeOpen);
  };

  return (
    <div className='flex flex-ro'>
      <div className='relative'>
        <button
          id='dropdownRadioButton'
          data-dropdown-toggle='dropdownRadio'
          className='inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mr-3'
          type='button'
          onClick={toggleDropdown}
        >
          <svg
            className='w-4 h-4 mr-2 text-gray-400'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
              clipRule='evenodd'
            />
          </svg>
          Last 30 days
          <svg
            className='w-3 h-3 ml-2'
            aria-hidden='true'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </button>
        {/* Dropdown menu */}
        {isOpen && (
          <div
            id='dropdownRadio'
            className='absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'
            data-popper-reference-hidden
            data-popper-escaped
            data-popper-placement='bottom-start'
            style={{
              top: 'calc(100% + 0.5rem)',
              left: '0',
            }}
          >
            <ul
              className='p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200'
              aria-labelledby='dropdownRadioButton'
            >
              <li>
                <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
                  <input
                    id='filter-radio-example-1'
                    type='radio'
                    defaultValue
                    name='filter-radio'
                    className='w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='filter-radio-example-1'
                    className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                  >
                    Last day
                  </label>
                </div>
              </li>
              <li>
                <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
                  <input
                    defaultChecked
                    id='filter-radio-example-2'
                    type='radio'
                    defaultValue
                    name='filter-radio'
                    className='w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='filter-radio-example-2'
                    className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                  >
                    Last 7 days
                  </label>
                </div>
              </li>
              <li>
                <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
                  <input
                    id='filter-radio-example-3'
                    type='radio'
                    defaultValue
                    name='filter-radio'
                    className='w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='filter-radio-example-3'
                    className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                  >
                    Last 30 days
                  </label>
                </div>
              </li>
              <li>
                <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
                  <input
                    id='filter-radio-example-4'
                    type='radio'
                    defaultValue
                    name='filter-radio'
                    className='w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='filter-radio-example-4'
                    className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                  >
                    Last month
                  </label>
                </div>
              </li>
              <li>
                <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
                  <input
                    id='filter-radio-example-5'
                    type='radio'
                    defaultValue
                    name='filter-radio'
                    className='w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='filter-radio-example-5'
                    className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                  >
                    Last year
                  </label>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className='relative'>
        <button
          id='dropdownRadioButton'
          data-dropdown-toggle='dropdownRadio'
          className='inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mr-3'
          type='button'
          onClick={toggleTypeDropdown}
        >
          <svg
            className='w-4 h-4 mr-2 text-gray-400'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
              clipRule='evenodd'
            />
          </svg>
          Tout
          <svg
            className='w-3 h-3 ml-2'
            aria-hidden='true'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </button>
        {/* Dropdown menu */}
        {isTypeOpen && (
          <div
            id='dropdownRadio'
            className='absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'
            data-popper-reference-hidden
            data-popper-escaped
            data-popper-placement='bottom-start'
            style={{
              top: 'calc(100% + 0.5rem)',
              left: '0',
            }}
          >
            <ul
              className='p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200'
              aria-labelledby='dropdownRadioButton'
            >
              <li>
                <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
                  <input
                    id='filter-radio-example-1'
                    type='radio'
                    defaultValue
                    name='filter-radio'
                    className='w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='filter-radio-example-1'
                    className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                  >
                    Tout
                  </label>
                </div>
              </li>
              <li>
                <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
                  <input
                    defaultChecked
                    id='filter-radio-example-2'
                    type='radio'
                    defaultValue
                    name='filter-radio'
                    className='w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='filter-radio-example-2'
                    className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                  >
                    Bon de livraison
                  </label>
                </div>
              </li>
              <li>
                <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
                  <input
                    id='filter-radio-example-3'
                    type='radio'
                    defaultValue
                    name='filter-radio'
                    className='w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='filter-radio-example-3'
                    className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                  >
                    Facture
                  </label>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsFilter;
