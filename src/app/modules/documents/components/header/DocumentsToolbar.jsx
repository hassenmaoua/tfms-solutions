import DocumentsFilter from './DocumentsFilter';

const DocumentsToolbar = () => {
  return (
    <div className='flex'>
      <DocumentsFilter />
      <button className='inline-flex items-center text-primary-500 bg-white border border-primary-300 focus:outline-none hover:bg-primary-100 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-primary-800 dark:text-white dark:border-primary-600 dark:hover:bg-primary-700 dark:hover:border-primary-600 dark:focus:ring-primary-700 mr-3'>
        Ajouter document
      </button>
    </div>
  );
};

export default DocumentsToolbar;
