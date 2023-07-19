import React from 'react';
import ActivitiesToolbar from './ActivitiesToolbar';
import ActivitiesSearchComponent from './ActivitiesSearchComponent';

const ActivitiesHeader = () => {
  return (
    <div className=' flex items-center justify-between py-3 mb-3 text-gray-900'>
      <ActivitiesToolbar />
      <ActivitiesSearchComponent />
    </div>
  );
};

export default ActivitiesHeader;
