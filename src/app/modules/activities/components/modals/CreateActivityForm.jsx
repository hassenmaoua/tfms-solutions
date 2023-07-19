import React from 'react';
import { useQuery } from 'react-query';
import { useActivityListView } from '../../core/ActivityListProvider';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  createActivity,
  getAllClients,
  updateActivity,
} from '../../core/requests';
import { useState } from 'react';
import { useActivityResponse } from '../../core/ActivityResponseProvider';
import { isNotEmpty } from '../../../../../assets/helpers';
import {
  ConfirmationDialog,
  ErrorAlert,
  SuccessAlert,
} from '../../../../../assets/helpers/alertDialogs';

const CreateActivityForm = ({ onClose, activity }) => {
  const { setShowCreateModal, setItemIdForUpdate, itemIdForUpdate } =
    useActivityListView();
  const { refetch } = useActivityResponse();

  const { data: clientsResponse } = useQuery(`clients-all`, getAllClients, {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const [initialValues] = useState({
    intitule: activity?.intitule || '',
    description: activity?.description || '',
    consumeBudget: activity?.consumeBudget || '',
    saleBudget: activity?.saleBudget || '',
    client: activity?.client || '',
    estimate: {
      time: activity?.estimate?.time || 1,
      unit: activity?.estimate?.unit || 'jour',
    },
    type: activity?.type || '',
    quantite: activity?.quantite || 1,
  });

  const validationSchema = Yup.object({
    intitule: Yup.string()
      .required('Veuillez saisir un intitulé')
      .min(3, 'Minimum 3 caractères')
      .max(50, 'Maximum 50 caractères'),
    description: Yup.string()
      .notRequired()
      .min(3, 'Minimum 3 caractères')
      .max(80, 'Maximum 80 caractères'),
    consumeBudget: Yup.number()
      .required('Veuillez saisir budget consommé')
      .moreThan(0, 'Le budget doit être supérieur à 0')
      .lessThan(9999, 'Budget non valide'),
    saleBudget: Yup.number()
      .required('Veuillez saisir budget de vente')
      .moreThan(1, 'Le budget doit être supérieur à 1')
      .lessThan(9999, 'Budget non valide'),
    type: Yup.string().required("Veuillez choisir un type d'activité"),
    quantite: Yup.number().required('Veuillez saisir une quantité'),
  });
  const handleSubmit = async (values) => {
    try {
      const result = await ConfirmationDialog({
        title: 'Êtes-vous sûr?',
        message:
          'Veuillez vérifier les informations détaillées avant de les soumettre.',
        confirmText: 'Oui, soumettre',
        cancelText: 'Non, retour',
      });
      if (result.isConfirmed) {
        if (isNotEmpty(itemIdForUpdate)) {
          await updateActivity(itemIdForUpdate, values);
          const result = await SuccessAlert(
            'Activité modifiée',
            "L'activité a été mise à jour avec succès",
            "D'accrod"
          );
          if (result.isConfirmed) setItemIdForUpdate('');
        } else {
          await createActivity(values);
          const result = await SuccessAlert(
            'Activité créée',
            'Activité créée avec succès ',
            "D'accrod"
          );
          if (result.isConfirmed) setShowCreateModal(false);
        }

        refetch();
      }
    } catch (error) {
      await ErrorAlert('Erreur', error);
      console.error(error);
    }
  };
  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={initialValues}
    >
      {() => (
        <Form autoComplete='off' className='space-y-2 md:space-y-4 text-left'>
          <div>
            <label
              htmlFor='intitule'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Intitulé <span className='text-red-500'>*</span>
            </label>
            <Field
              type='text'
              name='intitule'
              id='intitule'
              className='form-control'
              placeholder="Intitulé de l'activité"
            />
            <div className='text-red-500 text-[12px] h-[3px] mt-1'>
              <ErrorMessage name='intitule' />
            </div>
          </div>
          <div>
            <label
              htmlFor='description'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Description
            </label>
            <Field
              as='textarea'
              name='description'
              id='description'
              className='form-control min-h-[64px] max-h-[64px]'
              placeholder="Rédigez ici votre description de l'activité..."
              rows='2'
            />
            <div className='text-red-500 text-[12px] h-[3px] mt-1'>
              <ErrorMessage name='description' />
            </div>
          </div>

          <div className='flex gap-4 justify-between'>
            <div className='w-1/2 '>
              <label
                htmlFor='consumeBudget'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Budget consommé <span className='text-red-500'>*</span>
              </label>
              <div className='relative mt-2 rounded-md shadow-sm'>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                  <span className='text-gray-500 sm:text-sm'>TND</span>
                </div>
                <Field
                  type='number'
                  name='consumeBudget'
                  id='consumeBudget'
                  className='form-control pr-12'
                  placeholder='0.00'
                />
              </div>
              <div className='text-red-500 text-[12px] h-[3px] mt-1'>
                <ErrorMessage name='consumeBudget' />
              </div>
            </div>
            <div className='w-1/2 '>
              <label
                htmlFor='saleBudget'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Budget de vente <span className='text-red-500'>*</span>
              </label>
              <div className='relative mt-2 rounded-md shadow-sm'>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                  <span className='text-gray-500 sm:text-sm'>TND</span>
                </div>
                <Field
                  type='number'
                  name='saleBudget'
                  id='saleBudget'
                  className='form-control pr-12'
                  placeholder='0.00'
                />
              </div>
              <div className='text-red-500 text-[12px] h-[3px] mt-1'>
                <ErrorMessage name='saleBudget' />
              </div>
            </div>
          </div>
          <div className='flex gap-4 justify-between'>
            <div className='w-2/3'>
              <label
                htmlFor='client'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Client
              </label>
              <Field
                as='select'
                name='client'
                id='client'
                className='form-control'
              >
                <option value='' disabled hidden>
                  Choisir un client
                </option>
                {clientsResponse &&
                  clientsResponse.clients.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.intitule}
                    </option>
                  ))}
              </Field>
              <div className='text-red-500 text-[12px] h-[3px] mt-1'>
                <ErrorMessage name='client' />
              </div>
            </div>

            <div className='w-1/3'>
              <label
                htmlFor='estimate.time'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Estimation
              </label>
              <div className='relative mt-2 rounded-md shadow-sm'>
                <Field
                  type='number'
                  min='1'
                  max='30'
                  name='estimate.time'
                  id='estimate.time'
                  className='pr-[77px] form-control'
                />
                <div className='absolute inset-y-0 right-0 flex items-center'>
                  <label htmlFor='estimate.unit' className='sr-only'>
                    Unite
                  </label>
                  <Field
                    as='select'
                    id='estimate.unit'
                    name='estimate.unit'
                    className='h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-6 text-gray-500 focus:outline-none focus:ring-none sm:text-sm'
                  >
                    <option value='Jour'>Jour</option>
                    <option value='Semaine'>Semaine</option>
                    <option value='Mois'>Mois</option>
                  </Field>
                </div>
              </div>

              <div className='text-red-500 text-[12px] h-[3px] mt-1'>
                <ErrorMessage name='estimate' />
              </div>
            </div>
          </div>

          <div className='flex gap-4 justify-between'>
            <div className='w-2/3 '>
              <label
                htmlFor='activityType'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Type d'activité <span className='text-red-500'>*</span>
              </label>
              <Field as='select' name='type' id='type' className='form-control'>
                <option value='' disabled hidden>
                  Choisir un type d'activité
                </option>
                <option value='Fabrication'>Fabrication</option>
                <option value='Réparation'>Réparation</option>
                <option value='Altération'>Altération</option>
              </Field>
              <div className='text-red-500 text-[12px] h-[3px] mt-1'>
                <ErrorMessage name='type' />
              </div>
            </div>
            <div className='w-1/3'>
              <label
                htmlFor='quantite'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Quantitée <span className='text-red-500'>*</span>
              </label>
              <Field
                type='number'
                name='quantite'
                id='quantite'
                min='1'
                max='9999'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              />
              <div className='text-red-500 text-[12px] h-[3px] mt-1'>
                <ErrorMessage name='quantite' />
              </div>
            </div>
          </div>

          <div className='text-red-500 text-[12px] h-[3px] mt-1'>
            <ErrorMessage name='terms' />
          </div>

          <div className='flex justify-center gap-x-4'>
            <button type='submit' className='btn-default'>
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

export default CreateActivityForm;
