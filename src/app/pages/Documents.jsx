import React from 'react';
import DocumentsHeader from '../modules/documents/components/header/DocumentsHeader';
import Table from '../modules/documents/table/Table';
import DocumentsPagination from '../modules/documents/components/pagination/DocumentsPagination';

const Documents = () => {
  return (
    <div className='w-full'>
      <DocumentsHeader />
      <Table />
      <DocumentsPagination />
    </div>
  );
};

export default Documents;
