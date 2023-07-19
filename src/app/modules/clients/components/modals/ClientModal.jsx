import React from 'react';
import Modal from '../../../../../assets/helpers/components/Modal';
import SVG from 'react-inlinesvg';
import {
  capitalize,
  toAbsoluteUrl,
  toApiUrl,
} from '../../../../../assets/helpers';
import { Dialog } from '@headlessui/react';
import { useClientListView } from '../../core/ClientListProvider';

const ClientModal = ({ show }) => {
  const { client, setClient } = useClientListView();
  const handleClose = () => {
    setClient(undefined);
  };

  return (
    <Modal show={show} onClose={handleClose}>
      <Dialog.Panel className='bg-white relative shadow rounded-lg max-w-md mx-auto mx-auto transition-all'>
        {client && (
          <>
            <div className='flex justify-center'>
              {client.avatar ? (
                <img
                  src={toApiUrl(client.avatar)}
                  alt='Client Avatar'
                  className='rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110'
                />
              ) : (
                <div className='flex rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110 bg-gray-100 dark:bg-gray-600'>
                  <span className='mx-auto my-auto font-medium text-[52px] text-gray-600 dark:text-gray-300'>
                    {client.intitule.split(' ').map((word) => {
                      return word[0].toUpperCase();
                    })}
                  </span>
                </div>
              )}
            </div>
            <div className='mt-16'>
              <h1 className='font-bold text-center text-3xl text-gray-900'>
                {client.intitule}
              </h1>
              <p className='text-center text-sm text-gray-400 font-medium'>
                {capitalize(client.nature)}
              </p>
              <p>
                <span></span>
              </p>
              <div>
                <h3 className='font-medium text-gray-900 text-left px-6'>
                  Contact Informations
                </h3>

                <div className='my-5 px-6'>
                  <span className='text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-800 hover:bg-black hover:text-white'>
                    <span className='font-bold'>{client.email}</span>
                  </span>
                </div>
                <div className='my-5 px-6'>
                  <span className='text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-800 hover:bg-black hover:text-white'>
                    <span className='font-bold'>+216 {client.phone}</span>
                  </span>
                </div>
              </div>

              <div className='w-full'>
                <h3 className='font-medium text-gray-900 text-left px-6'>
                  Plus de détails
                </h3>
                <div className='mt-5 w-full flex flex-col items-center overflow-hidden text-sm'>
                  <div className='w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex items-center hover:bg-gray-100 transition duration-150'>
                    <SVG
                      src={toAbsoluteUrl('/media/icons/fin002.svg')}
                      className='h-6 w-6 inline-block mr-2 '
                    />
                    Matricule Fiscale
                    <span className='font-bold ms-1'>{client.tax}</span>
                  </div>

                  {client.address && (
                    <div className='w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex items-center hover:bg-gray-100 transition duration-150'>
                      <SVG
                        src={toAbsoluteUrl('/media/icons/gen018.svg')}
                        className='h-6 w-6 inline-block mr-2 '
                      />
                      Adresse
                      <span className='font-bold ms-1'>{client.address}</span>
                    </div>
                  )}

                  <div className='w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex items-center hover:bg-gray-100 transition duration-150'>
                    <SVG
                      src={toAbsoluteUrl('/media/icons/activite.svg')}
                      className='h-6 w-6 inline-block mr-2 '
                    />
                    Total des activites
                    <span className='font-bold ms-1'>0</span>
                  </div>

                  <div className='w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex items-center hover:bg-gray-100 transition duration-150'>
                    <SVG
                      src={toAbsoluteUrl('/media/icons/gen005.svg')}
                      className='h-6 w-6 inline-block mr-2 '
                    />
                    <span className='font-bold mr-1'>0</span>
                    Bon de lavrisons, <span className='font-bold mx-1'>0</span>
                    Factures
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Dialog.Panel>
    </Modal>
  );
};

export default ClientModal;
