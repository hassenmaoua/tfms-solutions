import React from 'react';
import { toApiUrl } from '../../../../assets/helpers';
import { useClientListView } from '../core/ClientListProvider';
import CardMenu from './CardMenu';

const ClientCard = ({ client }) => {
  const { setClient } = useClientListView();
  return (
    <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-primary-50 dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex justify-end px-4 pt-4'>
        <CardMenu id={client._id} />
      </div>
      <div
        className='flex flex-col items-center pb-10 '
        onClick={() => setClient(client)}
      >
        {client.avatar ? (
          <img
            className='w-24 h-24 mb-3 rounded-full shadow-lg'
            src={toApiUrl(client.avatar)}
            alt='Client Avatar'
          />
        ) : (
          <div className=' inline-flex items-center justify-center w-24 h-24 mb-3 shadow-lg overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
            <span className='font-medium text-[32px] text-gray-600 dark:text-gray-300'>
              {client.intitule.split(' ').map((word) => {
                return word[0].toUpperCase();
              })}
            </span>
          </div>
        )}
        <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
          {client.intitule}
        </h5>
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          {client.email}
        </span>
        {false && (
          <div className='flex mt-4 space-x-3 md:mt-6'>
            <button className='btn-default'>Verifier</button>
            <button className='btn-alternative'>Rejecter</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientCard;
