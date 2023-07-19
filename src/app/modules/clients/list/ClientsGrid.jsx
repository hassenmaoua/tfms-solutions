import React from 'react';
import ClientCard from './ClientCard';
import { useClientResponse } from '../core/ClientResponseProvider';
import ClientsPagination from '../components/pagination/ClientsPagination';
import ClientsLoading from '../components/loading/ClientsLoading';

const ClientsGrid = () => {
  const { isLoading, isError, response } = useClientResponse();

  if (isLoading) return <ClientsLoading />;

  if (isError)
    return (
      <div
        className='col-span-4 text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
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
      <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4'>
        {response.clients && response.clients.length > 0 ? (
          response.clients.map((item, index) => (
            <div key={index}>
              <ClientCard client={item} />
            </div>
          ))
        ) : (
          <div className='col-span-4 text-center text-gray-800 dark:text-gray-100 px-4 py-3 rounded relative'>
            Il n'y a pas des données correspondant.
          </div>
        )}
      </div>
      {!isLoading && !isError && response.clients.length > 0 && (
        <ClientsPagination />
      )}
    </>
  );
};

export default ClientsGrid;
