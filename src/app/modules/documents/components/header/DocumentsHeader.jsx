import React from 'react';
import DocumentsToolbar from './DocumentsToolbar';
import DocumentsSearchComponent from './DocumentsSearchComponent';

const DocumentsHeader = () => {
  return (
    <div className=' flex items-center justify-between py-3 mb-6 text-gray-900'>
      <DocumentsToolbar />
      <DocumentsSearchComponent />
    </div>
  );
};

export default DocumentsHeader;
