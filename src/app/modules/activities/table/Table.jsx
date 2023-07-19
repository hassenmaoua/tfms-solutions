import TableHeader from './TableHeader';
import TableRow from './TableRow';
import ActivitiesLoading from '../components/loading/ActivitiesLoading';
import ActivitiesPagination from '../components/pagination/ActivitiesPagination';
import { useActivityListView } from '../core/ActivityListProvider';
import { useActivityResponse } from '../core/ActivityResponseProvider';

const Table = () => {
  const { setActivity } = useActivityListView();
  const { isLoading, isError, response } = useActivityResponse();

  if (isError)
    return (
      <div
        className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
        role='alert'
      >
        <strong className='font-bold mr-2'>Erreur!</strong>
        <span className='block sm:inline'>
          Le traitement des données a échoué en raison d'un problème.
        </span>
      </div>
    );

  return (
    <>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <TableHeader />

        <tbody>
          {isLoading ? (
            <ActivitiesLoading />
          ) : isError ? (
            <tr>
              <td colSpan={7}>
                <div
                  className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
                  role='alert'
                >
                  <strong className='font-bold mr-2'>Erreur!</strong>
                  <span className='block sm:inline'>
                    Le traitement des données a échoué en raison d'un problème.
                  </span>
                </div>
              </td>
            </tr>
          ) : response.activities.length > 0 ? (
            response.activities.map((item, index) => (
              <TableRow
                key={index}
                activity={item}
                onClick={() => setActivity(item)}
              />
            ))
          ) : (
            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-primary-50 dark:hover:bg-gray-600'>
              <td className='p-4' colSpan={7}>
                <div className='text-center' role='alert'>
                  <span className='block sm:inline'>
                    Il n'y a pas des données correspondant.
                  </span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!isLoading && !isError && response.activities.length > 0 && (
        <ActivitiesPagination />
      )}
    </>
  );
};

export default Table;
