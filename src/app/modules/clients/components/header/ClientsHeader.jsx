import React from 'react';
import ClientsToolbar from './ClientsToolbar';
import ClientsSearchComponent from './ClientsSearchComponent';

const ClientsHeader = () => {
  return (
    <div className=' flex items-center justify-between py-3 mb-6 text-gray-900'>
      <ClientsToolbar />
      <ClientsSearchComponent />
    </div>
  );
};

export default ClientsHeader;
