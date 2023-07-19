import React, { useState } from 'react';
import Modal from '../../../../../assets/helpers/components/Modal';
import { Dialog } from '@headlessui/react';
import { useClientListView } from '../../core/ClientListProvider';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createClient, getClientById, updateClient } from '../../core/requests';
import { useClientResponse } from '../../core/ClientResponseProvider';
import { isNotEmpty, toApiUrl } from '../../../../../assets/helpers';
import { useQuery } from 'react-query';
import {
  ConfirmationDialog,
  DiscardDialog,
  ErrorAlert,
  SuccessAlert,
} from '../../../../../assets/helpers/alertDialogs';

const CreateClientForm = ({ onClose, client }) => {
  const { setShowCreateModal, setItemIdForUpdate, itemIdForUpdate } =
    useClientListView();
  const { refetch } = useClientResponse();

  const [initialValues] = useState({
    nature: client?.nature || '',
    intitule: client?.intitule || '',
    tax: client?.tax || '',
    phone: client?.phone || '',
    email: client?.email || '',
    address: client?.address || '',
    avatar: null,
  });
  const validationSchema = Yup.object({
    nature: Yup.string().required('Veuillez selectionez nature de client'),
    intitule: Yup.string()
      .required('Veuillez saisir intitulé')
      .min(3, 'Minimum 3 caractères')
      .max(50, 'Maximum 50 caractères'),
    tax: Yup.string()
      .required('Veuillez saisir matricule fiscale')
      .min(3, 'Minimum 3 symboles')
      .max(25, 'Maximum 25 symboles.'),
    phone: Yup.string()
      .required('Veuillez saisir un numéro de téléphone')
      .matches(/^[24579]\d{7}$/, {
        message: 'Le numéro de téléphone non valide',
        excludeEmptyString: true,
      }),

    email: Yup.string()
      .required('Veuillez saisir une adresse e-mail')
      .email('Veuillez saisir une adresse e-mail valide')
      .min(3, 'Minimum 3 symboles')
      .max(50, 'Maximum 50 symboles.'),

    address: Yup.string()
      .notRequired()
      .min(3, 'Minimum 3 caractères')
      .max(60, 'Maximum 60 caractères'),
  });
  const [previewImage, setPreviewImage] = useState('');
  const [avatar, setAvatar] = useState(client?.avatar);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const result = await ConfirmationDialog({
        title: 'Êtes-vous sûr?',
        message:
          'Veuillez vérifier les informations détaillées avant de les soumettre.',
        confirmText: 'Oui, soumettre',
        cancelText: 'Non, retour',
      });
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('intitule', values.intitule);
        formData.append('tax', values.tax);
        formData.append('phone', values.phone);
        formData.append('email', values.email);
        formData.append('nature', values.nature);
        formData.append('address', values.address);
        if (values.avatar) {
          formData.append('avatar', values.avatar);
        }

        if (isNotEmpty(itemIdForUpdate)) {
          await updateClient(itemIdForUpdate, formData);
          const result = await SuccessAlert(
            'Client modifiée',
            'Le client a été mise à jour avec succès',
            "D'accrod"
          );
          if (result.isConfirmed) setItemIdForUpdate(undefined);
        } else {
          await createClient(formData);
          const result = await SuccessAlert(
            'Activité créée',
            'Activité créée avec succès ',
            "D'accrod"
          );
          if (result.isConfirmed) setShowCreateModal(false);
        }
        refetch();
        resetForm();
        setPreviewImage('');
      }
    } catch (error) {
      // Handle error
      await ErrorAlert('Erreur', error);
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue('avatar', file);

    const imageURL = URL.createObjectURL(file);
    setPreviewImage(imageURL);
    setAvatar('');
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, setFieldValue, errors, touched }) => (
        <Form
          autoComplete='off'
          className='text-left'
          encType='multipart/form-data'
        >
          <div className='mb-5'>
            <label
              htmlFor='cover-photo'
              className='block text-sm leading-6 text-gray-500 dark:text-gray-400'
            >
              Avatar
            </label>
            {previewImage || avatar ? (
              <div className='flex justify-center rounded-full w-32 h-32 p-3 mx-auto'>
                <div className='relative text-center'>
                  {avatar ? (
                    <img
                      src={toApiUrl(avatar)}
                      alt='Avatar Preview'
                      className='w-full h-full rounded-full object-cover '
                    />
                  ) : (
                    <img
                      src={previewImage}
                      alt='Avatar Preview'
                      className='w-full h-full rounded-full object-cover '
                    />
                  )}

                  <div className='mt-2 absolute bottom-0 start-5 flex text-sm leading-4 text-gray-600'>
                    <label
                      htmlFor='avatar'
                      className='relative cursor-pointer rounded-md opacity-0 hover:opacity-100  transition hover:bg-white px-2 py-1 font-semibold text-primary-600 focus-within:outline-none focus-within:ring-none hover:text-primary-500'
                    >
                      <span>Changer</span>
                      <input
                        id='avatar'
                        name='avatar'
                        type='file'
                        className='sr-only'
                        onChange={(event) =>
                          handleFileChange(event, setFieldValue)
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className='mt-2 flex justify-center rounded-full border border-dashed border-gray-900/25 w-32 h-32 p-3 mx-auto'>
                <div className='text-center'>
                  <svg
                    className='mx-auto h-12 w-12 text-gray-300'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
                      clipRule='evenodd'
                    />
                  </svg>

                  <div className='mt-2 flex text-sm leading-4 text-gray-600'>
                    <label
                      htmlFor='avatar'
                      className='relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-none hover:text-primary-500'
                    >
                      <span>Uploader une image</span>
                      <input
                        id='avatar'
                        name='avatar'
                        type='file'
                        accept='image/png, image/jpeg, image/jpg'
                        className='sr-only'
                        onChange={(event) =>
                          handleFileChange(event, setFieldValue)
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
            <p className='w-full text-center text-xs leading-5 text-gray-600'>
              PNG, JPG jusqu'à 10Mo
            </p>
          </div>
          <div className='mb-5'>
            <div className='flex gap-x-4 w-full '>
              <div className='cursor-pointer group hover:bg-gray-100 flex w-full items-center pl-3 border border-gray-200 rounded dark:border-gray-700'>
                <Field
                  type='radio'
                  id='societe'
                  name='nature'
                  value='societe'
                  className='w-4 h-4 cursor-pointer text-primary-600 bg-gray-100 border-gray-300 focus:ring-0 dark:focus:ring-0 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600'
                />
                <label
                  htmlFor='societe'
                  className='cursor-pointer w-full py-2 ml-2 text-sm text-gray-500 dark:text-gray-400'
                >
                  Société
                </label>
              </div>

              <div className='cursor-pointer group hover:bg-gray-100 flex w-full items-center pl-3 border border-gray-200 rounded dark:border-gray-700'>
                <Field
                  type='radio'
                  id='individuelle'
                  name='nature'
                  value='individuelle'
                  className='w-4 h-4 cursor-pointer text-primary-600 bg-gray-100 border-gray-300 focus:ring-0 dark:focus:ring-0 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600'
                />
                <label
                  htmlFor='individuelle'
                  className='cursor-pointer w-full py-2 ml-2 text-sm text-gray-500 dark:text-gray-400'
                >
                  Individuelle
                </label>
              </div>
            </div>
            <p className='mt-1 h-[6px] text-xs text-red-600 dark:text-red-500'>
              <ErrorMessage name='nature' />
            </p>
          </div>

          <div className='grid md:grid-cols-2 md:gap-6'>
            {/* Intitule Field */}
            <div
              className={`relative z-0 w-full mb-6 group ${
                errors.intitule && touched.intitule ? 'border-red-500' : ''
              }`}
            >
              <Field
                type='text'
                name='intitule'
                id='intitule'
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                  errors.intitule && touched.intitule
                    ? 'border-red-500'
                    : 'border-gray-300'
                } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 ${
                  errors.intitule && touched.intitule
                    ? 'focus:border-red-500'
                    : 'focus:border-primary-600'
                } peer`}
                placeholder=' '
                required=''
              />
              <label
                htmlFor='intitule'
                className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                  errors.intitule && touched.intitule
                    ? 'peer-focus:text-red-500'
                    : 'peer-focus:text-primary-600'
                } peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
              >
                Intitule
              </label>
              {/* Intitule validation error */}
              <p className='mt-2 h-[6px] text-xs text-red-600 dark:text-red-500'>
                <ErrorMessage name='intitule' />
              </p>
            </div>

            {/* Tax Field */}
            <div
              className={`relative z-0 w-full mb-6 group ${
                errors.tax && touched.tax ? 'border-red-500' : ''
              }`}
            >
              <Field
                type='text'
                name='tax'
                id='tax'
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                  errors.tax && touched.tax
                    ? 'border-red-500'
                    : 'border-gray-300'
                } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 ${
                  errors.tax && touched.tax
                    ? 'focus:border-red-500'
                    : 'focus:border-primary-600'
                } peer`}
                placeholder=' '
                required=''
              />
              <label
                htmlFor='tax'
                className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                  errors.tax && touched.tax
                    ? 'peer-focus:text-red-500'
                    : 'peer-focus:text-primary-600'
                } peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
              >
                Matricule fiscale
              </label>
              {/* Tax validation error */}
              <p className='mt-2 h-[6px] text-xs text-red-600 dark:text-red-500'>
                <ErrorMessage name='tax' />
              </p>
            </div>
          </div>

          <div className='grid md:grid-cols-2 md:gap-6'>
            {/* Phone Field */}
            <div
              className={`relative z-0 w-full mb-6 group ${
                errors.phone && touched.phone ? 'border-red-500' : ''
              }`}
            >
              <Field
                type='phone'
                name='phone'
                id='phone'
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                  errors.phone && touched.phone
                    ? 'border-red-500'
                    : 'border-gray-300'
                } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 ${
                  errors.phone && touched.phone
                    ? 'focus:border-red-500'
                    : 'focus:border-primary-600'
                } peer`}
                placeholder=' '
                required=''
              />
              <label
                htmlFor='phone'
                className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                  errors.phone && touched.phone
                    ? 'peer-focus:text-red-500'
                    : 'peer-focus:text-primary-600'
                } peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
              >
                Numéro de téléphone
              </label>
              {/* Phone validation error */}
              <p className='mt-2 h-[6px] text-xs text-red-600 dark:text-red-500'>
                <ErrorMessage name='phone' />
              </p>
            </div>

            {/* Email Field */}
            <div
              className={`relative z-0 w-full mb-6 group ${
                errors.email && touched.email ? 'border-red-500' : ''
              }`}
            >
              <Field
                type='email'
                name='email'
                id='email'
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                  errors.email && touched.email
                    ? 'border-red-500'
                    : 'border-gray-300'
                } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 ${
                  errors.email && touched.email
                    ? 'focus:border-red-500'
                    : 'focus:border-primary-600'
                } peer`}
                placeholder=' '
                required=''
              />
              <label
                htmlFor='email'
                className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                  errors.email && touched.email
                    ? 'peer-focus:text-red-500'
                    : 'peer-focus:text-primary-600'
                } peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
              >
                Courrier électronique
              </label>
              {/* Email validation error */}
              <p className='mt-2 h-[6px] text-xs text-red-600 dark:text-red-500'>
                <ErrorMessage name='email' />
              </p>
            </div>
          </div>

          {/* Address Field */}
          <div
            className={`relative z-0 w-full mb-6 group ${
              errors.address && touched.address ? 'border-red-500' : ''
            }`}
          >
            <Field
              type='text'
              name='address'
              id='address'
              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                errors.address && touched.address
                  ? 'border-red-500'
                  : 'border-gray-300'
              } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 ${
                errors.address && touched.address
                  ? 'focus:border-red-500'
                  : 'focus:border-primary-600'
              } peer`}
              placeholder=' '
              required=''
            />
            <label
              htmlFor='address'
              className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                errors.address && touched.address
                  ? 'peer-focus:text-red-500'
                  : 'peer-focus:text-primary-600'
              } peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
            >
              Adresse postale actuelle
            </label>
            {/* Address validation error */}
            <p className='mt-2 h-[6px] text-xs text-red-600 dark:text-red-500'>
              <ErrorMessage name='address' />
            </p>
          </div>

          <div className='flex justify-center gap-x-4'>
            <button
              disabled={isSubmitting}
              type='submit'
              className='btn-default'
            >
              Soumettre
            </button>
            <button type='reset' onClick={onClose} className='btn-alternative'>
              Annuler
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const CreateClientModal = ({ show }) => {
  const { setShowCreateModal, setItemIdForUpdate, itemIdForUpdate } =
    useClientListView();

  const enabledQuery = isNotEmpty(itemIdForUpdate);

  const {
    isFetching: isLoading,
    error,
    data: clientForUpdate,
  } = useQuery(
    `client-id-${itemIdForUpdate}`,
    () => getClientById(itemIdForUpdate),
    {
      enabled: enabledQuery,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      keepPreviousData: false,
      onError: (err) => {
        setItemIdForUpdate(undefined);
        console.error(err);
      },
    }
  );

  const handleClose = async () => {
    const result = await DiscardDialog(
      'Êtes-vous sûr?',
      'Oui, annuler',
      'Non, retour'
    );
    if (result.isConfirmed) {
      setShowCreateModal(false);
      setItemIdForUpdate(undefined);
    }
  };

  if (!itemIdForUpdate && !clientForUpdate) {
    return (
      <Modal show={show} onClose={handleClose}>
        <Dialog.Panel className='bg-white relative shadow rounded-lg max-w-lg mx-auto transition-all'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Ajouter un client
              </h1>

              <CreateClientForm onClose={handleClose} client={undefined} />
            </div>
          </div>
        </Dialog.Panel>
      </Modal>
    );
  }

  if (clientForUpdate) {
    return (
      <Modal show={show} onClose={handleClose}>
        <Dialog.Panel className='bg-white relative shadow rounded-lg max-w-lg mx-auto transition-all'>
          {!isLoading && !error ? (
            <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                  Modifier un client
                </h1>

                <CreateClientForm
                  onClose={handleClose}
                  client={clientForUpdate}
                />
              </div>
            </div>
          ) : (
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8 h-[600px] flex items-center justify-center'>
              <div role='status' className=''>
                <svg
                  aria-hidden='true'
                  class='w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary-600'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
                <span class='sr-only'>Loading...</span>
              </div>
              <div className='h-10'>Chargement des données...</div>
            </div>
          )}
        </Dialog.Panel>
      </Modal>
    );
  }
};

export default CreateClientModal;
