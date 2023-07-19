import React from 'react';
import { useActivityListView } from '../../core/ActivityListProvider';

const ActivitiesGrouping = () => {
  const { selected } = useActivityListView();
  return (
    <div className='flex justify-end items-center'>
      <div className='font-semibold mr-3'>
        <span className='mr-1'>{selected.length}</span>sélectionnée(s)
      </div>
      <button
        className='inline-flex items-center text-red-500 bg-white border border-red-300 focus:outline-none hover:bg-red-100 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-red-800 dark:text-white dark:border-red-600 dark:hover:bg-red-700 dark:hover:border-red-600 dark:focus:ring-red-700'
        onClick={() => alert(selected.length + ' item selected!')}
      >
        Supprimer
      </button>
    </div>
  );
};

export default ActivitiesGrouping;
