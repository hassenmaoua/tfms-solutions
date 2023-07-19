import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  initialQueryState,
  useActivityRequest,
} from '../../core/ActivityRequestProvider';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../../../../assets/helpers';

const ActivitiesFilter = () => {
  const { updateState } = useActivityRequest();
  const [filter, setFilter] = useState('');

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);

    updateState({ filter: { date: selectedFilter }, ...initialQueryState });
  };

  return (
    <div className='relative'>
      <Menu>
        <Menu.Button className='btn-secondary mr-3'>
          <SVG
            className='w-4 h-4 mr-2 text-gray-500'
            src={toAbsoluteUrl('/media/icons/gen013.svg')}
          />

          {filter === '7-days'
            ? '7 derniers jours'
            : filter === '30-days'
            ? 'Mois dernier'
            : filter === '1-year'
            ? "L'année dernière"
            : 'Tout'}
        </Menu.Button>
        <Transition
          enter='transition duration-300 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-200 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'
        >
          <Menu.Items
            as='ul'
            className='absolute p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200 z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 transition-all ease-in-out duration-300'
          >
            <Menu.Item as='li' onClick={() => handleFilterChange('')}>
              <div
                className={`flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  !filter ? 'bg-gray-100 dark:bg-gray-600' : ''
                }`}
              >
                <input
                  id='filter-radio-all'
                  type='radio'
                  name='filter-radio'
                  className='w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  checked={!filter}
                  readOnly
                />
                <label
                  htmlFor='filter-radio-all'
                  className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                >
                  Tout
                </label>
              </div>
            </Menu.Item>
            <Menu.Item as='li' onClick={() => handleFilterChange('7-days')}>
              <div
                className={`flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  filter === '7-days' ? 'bg-gray-100 dark:bg-gray-600' : ''
                }`}
              >
                <input
                  id='filter-radio-7-days'
                  type='radio'
                  name='filter-radio'
                  className='w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  checked={filter === '7-days'}
                  readOnly
                />
                <label
                  htmlFor='filter-radio-7-days'
                  className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                >
                  7 derniers jours
                </label>
              </div>
            </Menu.Item>
            <Menu.Item as='li' onClick={() => handleFilterChange('30-days')}>
              <div
                className={`flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  filter === '30-days' ? 'bg-gray-100 dark:bg-gray-600' : ''
                }`}
              >
                <input
                  id='filter-radio-30-days'
                  type='radio'
                  name='filter-radio'
                  className='w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  checked={filter === '30-days'}
                  readOnly
                />
                <label
                  htmlFor='filter-radio-30-days'
                  className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                >
                  Mois dernier
                </label>
              </div>
            </Menu.Item>

            <Menu.Item as='li' onClick={() => handleFilterChange('1-year')}>
              <div
                className={`flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  filter === '1-year' ? 'bg-gray-100 dark:bg-gray-600' : ''
                }`}
              >
                <input
                  id='filter-radio-year'
                  type='radio'
                  name='filter-radio'
                  className='w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  checked={filter === '1-year'}
                  readOnly
                />
                <label
                  htmlFor='filter-radio-year'
                  className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                >
                  L'année dernière
                </label>
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ActivitiesFilter;
