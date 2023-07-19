import React from 'react';
import { useActivityResponsePagination } from '../../core/ActivityResponseProvider';
import { useActivityResponse } from '../../core/ActivityResponseProvider';
import { useActivityRequest } from '../../core/ActivityRequestProvider';

const ActivitiesPagination = () => {
  const { isLoading } = useActivityResponse();
  const pagination = useActivityResponsePagination();
  const { updateState } = useActivityRequest();

  const updatePage = (page) => {
    if (page === pagination.page || isLoading) {
      return;
    }

    updateState({
      page,
      items_per_page: pagination?.items_per_page || 10,
      to: pagination.to,
      from: pagination.from,
    });
  };

  return (
    <nav
      className='flex items-center justify-between  py-4'
      aria-label='Table navigation'
    >
      <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
        Affichage de{' '}
        <span className='font-semibold text-gray-900 dark:text-white'>
          {pagination.from}
        </span>{' '}
        à{' '}
        <span className='font-semibold text-gray-900 dark:text-white'>
          {pagination.to}
        </span>{' '}
        sur{' '}
        <span className='font-semibold text-gray-900 dark:text-white'>
          {pagination.total_elements}
        </span>
      </span>
      <ul className='inline-flex items-center -space-x-px'>
        <li>
          <button
            disabled={pagination.page === 1}
            onClick={() => updatePage(pagination.page - 1)}
            className='cursor-pointer hover:bg-primary-100 block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            <span className='sr-only'>Previous</span>
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </li>
        {pagination.links?.map((link) => (
          <li key={link.page}>
            <button
              onClick={() => updatePage(link.page)}
              className={`${
                pagination.page === link.page
                  ? 'bg-primary-200'
                  : 'bg-white hover:bg-primary-100'
              } cursor-pointer px-3 py-2 leading-tight text-gray-500  border border-gray-300 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              {link.page}
            </button>
          </li>
        ))}

        <li>
          <button
            disabled={pagination.page === pagination.links?.length}
            onClick={() => updatePage(pagination.page + 1)}
            className='cursor-pointer hover:bg-primary-100 block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            <span className='sr-only'>Next</span>
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ActivitiesPagination;
