import React from 'react';
import { useActivityListView } from '../core/ActivityListProvider';

const TableHeader = () => {
  const { isAllSelected, onSelectAll } = useActivityListView();

  return (
    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
      <tr>
        <th scope='col' className='p-4'>
          <div className='flex items-center'>
            <input
              id='checkbox-all-search'
              type='checkbox'
              checked={isAllSelected}
              onChange={onSelectAll}
              className='w-4 h-4 checkbox-default'
            />
            <label htmlFor='checkbox-all-search' className='sr-only'>
              checkbox
            </label>
          </div>
        </th>
        <th scope='col' className='px-4 py-3  w-3/12'>
          Intitulé
        </th>
        <th scope='col' className='px-4 py-3 w-2/12'>
          État
        </th>
        <th scope='col' className='px-4 py-3 w-3/12'>
          Client
        </th>
        <th scope='col' className='px-4 py-3 w-2/12'>
          Type activité
        </th>
        <th scope='col' className='px-4 py-3 w-1/12'>
          Qté
        </th>
        <th scope='col' className='px-4 py-3 w-1/12 text-center'>
          Action
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
