import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  initialQueryState,
  useClientRequest,
} from '../../core/ClientRequestProvider';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../../../../assets/helpers';
const ClientsFilter = () => {
  const { updateState } = useClientRequest();
  const [filter, setFilter] = useState('');

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);

    updateState({ filter: { nature: selectedFilter }, ...initialQueryState });
  };

  return (
    <div className='relative'>
      <Menu>
        <Menu.Button className='btn-secondary mr-3'>
          <SVG
            className='w-4 h-4 mr-2 text-gray-400'
            src={toAbsoluteUrl('/media/icons/gen028.svg')}
          />
          {filter === 'individuelle'
            ? 'Individuelle'
            : filter === 'societe'
            ? 'Société'
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
            <Menu.Item
              as='li'
              onClick={() => handleFilterChange('individuelle')}
            >
              <div
                className={`flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  filter === 'individuelle'
                    ? 'bg-gray-100 dark:bg-gray-600'
                    : ''
                }`}
              >
                <input
                  id='filter-radio-individuelle'
                  type='radio'
                  name='filter-radio'
                  className='w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  checked={filter === 'individuelle'}
                  readOnly
                />
                <label
                  htmlFor='filter-radio-individuelle'
                  className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                >
                  Individuelle
                </label>
              </div>
            </Menu.Item>
            <Menu.Item as='li' onClick={() => handleFilterChange('societe')}>
              <div
                className={`flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  filter === 'societe' ? 'bg-gray-100 dark:bg-gray-600' : ''
                }`}
              >
                <input
                  id='filter-radio-societe'
                  type='radio'
                  name='filter-radio'
                  className='w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  checked={filter === 'societe'}
                  readOnly
                />
                <label
                  htmlFor='filter-radio-societe'
                  className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                >
                  Société
                </label>
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ClientsFilter;
