import React from 'react';

const TableHeader = () => {
  return (
    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
      <tr>
        <th scope='col' className='px-4 py-3'>
          Referance
        </th>
        <th scope='col' className='px-4 py-3'>
          Date
        </th>
        <th scope='col' className='px-4 py-3'>
          Bénéficiaire
        </th>
        <th scope='col' className='px-4 py-3'>
          Status
        </th>
        <th scope='col' className='px-4 py-3'>
          Total TTC
        </th>
        <th scope='col' className='px-4 py-3 text-center'>
          Action
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
