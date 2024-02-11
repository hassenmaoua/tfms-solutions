import React, { useMemo } from 'react';
import { useActivityListView } from '../core/ActivityListProvider';
import { toApiUrl } from '../../../../assets/helpers';
import Badge from '../../../../assets/helpers/components/Badge';

const TableRow = ({ activity, onClick }) => {
  const id = activity._id;

  const { selected, onSelect, setItemIdForUpdate } = useActivityListView();
  const isSelected = useMemo(() => selected.includes(id), [id, selected]);
  return (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-primary-50 dark:hover:bg-gray-600'>
      <td className='w-4 p-4'>
        <div className='flex items-center'>
          <input
            id='checkbox-table-search-1'
            type='checkbox'
            checked={isSelected}
            onChange={() => onSelect(id)}
            className='w-4 h-4 checkbox-default'
          />
          <label htmlFor='checkbox-table-search-1' className='sr-only'>
            checkbox
          </label>
        </div>
      </td>
      <th
        scope='row'
        className='px-6 py-4 font-medium text-gray-900 hover:text-primary-700 hover:cursor-pointer whitespace-nowrap dark:text-white'
        onClick={onClick}
      >
        {activity.intitule}
      </th>
      <td className='p-4'>
        <Badge color={activity.state.style} className='text-xs'>
          {activity.state.label}
        </Badge>
      </td>
      <td className='flex items-center p-4 text-gray-900 whitespace-nowrap dark:text-white'>
        {activity.client && (
          <>
            {activity.client.avatar ? (
              <img
                className='w-8 h-8 rounded-full mr-2'
                src={toApiUrl(activity.client.avatar)}
                alt='Avatar'
              />
            ) : (
              <div className='relative inline-flex items-center justify-center w-8 h-8 rounded-full mr-2 overflow-hidden bg-gray-100 dark:bg-gray-600'>
                <span className='font-medium text-xs text-gray-600 dark:text-gray-300'>
                  {activity.client.intitule.split(' ').map((word) => {
                    return word[0].toUpperCase();
                  })}
                </span>
              </div>
            )}
            {activity.client.intitule}
          </>
        )}
      </td>
      <td className='p-4'>{activity.type}</td>
      <td className='p-4'>{activity.quantite}</td>

      <td className='p-2 text-center w-20'>
        <button
          onClick={() => setItemIdForUpdate(id)}
          className='font-medium text-primary-600 dark:text-primary-500 hover:underline'
        >
          Modifier
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
