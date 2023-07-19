import React from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

import { documents } from '../core/sample';
import DocumentsLoading from '../components/loading/DocumentsLoading';

const Table = () => {
  return (
    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
      <TableHeader />
      <tbody>
        {1 == 2 ? (
          <DocumentsLoading />
        ) : (
          documents.map((item, index) => (
            <TableRow key={index} document={item} />
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
