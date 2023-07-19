import React from 'react';
import { toAbsoluteUrl } from '../../../../assets/helpers';

const TableRow = ({ document }) => {
  return (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-primary-50 dark:hover:bg-gray-600'>
      <th
        scope='row'
        className='px-6 py-4 font-medium text-gray-900 hover:text-primary-700 hover:cursor-pointer whitespace-nowrap dark:text-white'
      >
        {document.ref}
      </th>
      <td className='p-4'>{document.date}</td>
      <td className='flex items-center p-4 text-gray-900 whitespace-nowrap dark:text-white'>
        <img
          className='w-8 h-8 rounded-full mr-2'
          src={toAbsoluteUrl('/media/avatars/' + document.beneficiaire.avatar)}
          alt='Avatar'
        />
        {document.beneficiaire.nom}
      </td>
      <td className='p-4'>
        <span
          className={`bg-${document.status.style}-100 text-${document.status.style}-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-${document.status.style}-900 dark:text-${document.status.style}-300`}
        >
          {document.status.label}
        </span>
      </td>
      <td className='p-4'>{document.totalTTC}</td>

      <td className='p-2 text-center w-20'>
        <button className='font-medium text-primary-600 dark:text-primary-500 hover:underline'>
          Modifier
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
