import Modal from '../../../../../assets/helpers/components/Modal';
import { Dialog } from '@headlessui/react';
import SVG from 'react-inlinesvg';
import {
  toApiUrl,
  toAbsoluteUrl,
  dateFormat,
} from '../../../../../assets/helpers';
import { useActivityListView } from '../../core/ActivityListProvider';
import UpdateStateDropdown from './UpdateStateDropdown';

const ActivityModal = ({ show }) => {
  const { activity, setActivity } = useActivityListView();

  const handleClose = () => {
    setActivity(undefined);
  };

  const data = activity;

  return (
    <Modal show={show} onClose={handleClose}>
      <Dialog.Panel className='bg-white relative shadow rounded-lg max-w-md mx-auto transition-all'>
        {data && (
          <div className=''>
            <img
              className='w-full h-56 object-cover object-center'
              src={toAbsoluteUrl(
                '/media/backgrounds/manufacturing-process-bro.svg'
              )}
              alt='avatar'
            />
            <div className='flex items-center px-6 py-3 bg-gray-800'>
              <SVG
                className='h-6 w-6 text-white fill-current'
                src={toAbsoluteUrl('/media/icons/activite.svg')}
              />

              <h1 className='mx-3 text-white font-semibold text-lg'>
                {data.intitule}
              </h1>
            </div>
            <div className='py-4 px-6'>
              <div className='flex items-start justify-between'>
                <div className='flex items-center'>
                  <div className='relative'>
                    {activity.client && (
                      <>
                        {activity.client.avatar ? (
                          <img
                            className='w-10 h-10 rounded-full mr-2'
                            src={toApiUrl(activity.client.avatar)}
                            alt='Avatar'
                          />
                        ) : (
                          <div className='relative inline-flex items-center justify-center w-10 h-10 rounded-full mr-2 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
                            <span className='font-medium text-sm text-gray-600 dark:text-gray-300'>
                              {activity.client.intitule
                                .split(' ')
                                .map((word) => {
                                  return word[0].toUpperCase();
                                })}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                    <span className='absolute top-0 right-0 inline-block w-3 h-3 bg-primary-red rounded-full' />
                  </div>
                  <p className='ml-2 text-2xl font-semibold text-gray-800 line-clamp-1'>
                    {activity.client && activity.client.intitule}
                  </p>
                </div>
                <UpdateStateDropdown state={activity.state} />
              </div>

              <p className='py-2 text-left text-lg text-gray-700'>
                {data.description}
              </p>
            </div>
            <div className='w-full'>
              <h3 className='font-medium text-gray-900 text-left px-6'>
                Plus de détails
              </h3>
              <div className='mt-5 w-full flex flex-col items-center overflow-hidden text-sm'>
                <div className='w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex items-center hover:bg-gray-100 transition duration-150'>
                  <SVG
                    src={toAbsoluteUrl('/media/icons/gen025.svg')}
                    className='h-6 w-6 inline-block mr-2 '
                  />
                  Nature d'activité :
                  <span className='font-bold ms-1'>{data.type}</span>, Quantité
                  :<span className='font-bold ms-1'>{data.quantite}</span>
                </div>
                <div className='w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex items-center hover:bg-gray-100 transition duration-150'>
                  <SVG
                    src={toAbsoluteUrl('/media/icons/fin003.svg')}
                    className='h-6 w-6 inline-block mr-2 '
                  />
                  Consommation :
                  <span className='font-bold ms-1'>
                    {data.consumeBudget} TND
                  </span>
                  , Vente :
                  <span className='font-bold ms-1'>{data.saleBudget} TND</span>
                </div>

                <div className='w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex items-center hover:bg-gray-100 transition duration-150'>
                  <SVG
                    src={toAbsoluteUrl('/media/icons/gen012.svg')}
                    className='h-6 w-6 inline-block mr-2 '
                  />
                  Estimé dans
                  <span className='font-bold ms-1'>
                    {data.estimate.time} {data.estimate.unit}
                  </span>
                </div>
                <div className='w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full flex items-center hover:bg-gray-100 transition duration-150'>
                  <SVG
                    src={toAbsoluteUrl('/media/icons/gen014.svg')}
                    className='h-6 w-6 inline-block mr-2 '
                  />
                  Crée le
                  <span className='font-bold ms-1'>
                    {dateFormat(data.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog.Panel>
    </Modal>
  );
};

export default ActivityModal;
