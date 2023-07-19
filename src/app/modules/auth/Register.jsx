import axios from 'axios';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { toAbsoluteUrl } from '../../../assets/helpers/AssetsHelpers';
import { Link, useNavigate } from 'react-router-dom';
import { SuccessAlert, ErrorAlert } from '../../../assets/helpers/alertDialogs';

const API_URL = process.env.REACT_APP_API_URL;

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    'confirm-password': '',
    terms: false,
  };

  const validationSchema = Yup.object({
    nom: Yup.string()
      .required('Veuillez saisir votre nom')
      .min(3, 'Minimum 3 caractères')
      .max(30, 'Maximum 30 caractères'),
    prenom: Yup.string()
      .required('Veuillez saisir votre prenom')
      .min(3, 'Minimum 3 caractères')
      .max(30, 'Maximum 30 caractères'),

    email: Yup.string()
      .required('Veuillez saisir une adresse e-mail')
      .email('Veuillez saisir une adresse e-mail valide')
      .min(3, 'Minimum 3 symboles')
      .max(50, 'Maximum 50 symboles.'),

    password: Yup.string().required('Veuillez entrer un mot de passe'),
    // .min(
    //   6,
    //   ({ min }) => `Le mot de passe doit contenir au moins ${min} caractères`
    // )
    // .max(
    //   20,
    //   ({ max }) =>
    //     `Le mot de passe doit contenir au maximum ${max} caractères`
    // )
    // .matches(
    //   /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{6,20}$/,
    //   'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial'
    // )
    'confirm-password': Yup.string()
      .required('Veuillez confirmer le mot de passe')
      .oneOf(
        [Yup.ref('password'), null],
        'Les mots de passe doivent correspondre'
      ),
    terms: Yup.boolean().oneOf(
      [true],
      'Veuillez accepter les Termes et Conditions'
    ),
  });

  const handleSubmit = async (values) => {
    const formData = {
      name: values.nom + ' ' + values.prenom,
      email: values.email,
      password: values.password,
    };
    try {
      const response = await axios.post(`${API_URL}/register`, formData);

      const results = await SuccessAlert(response.data.message);
      if (results.isConfirmed) navigate('/auth/login');
    } catch (error) {
      ErrorAlert('Failed to register', error.response.data.message);
      console.error(error);
      // Handle registration error
    }
  };

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <Link
          to='/'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900'
        >
          <img
            className='h-20'
            src={toAbsoluteUrl('/media/logos/logo.png')}
            alt='logo'
          />
        </Link>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Créer un compte
            </h1>
            <Formik
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              initialValues={initialValues}
            >
              {() => (
                <Form
                  noValidate
                  autoComplete='off'
                  className='space-y-2 md:space-y-4'
                >
                  <div className='flex gap-4 justify-between'>
                    <div className='w-1/2'>
                      <label
                        htmlFor='nom'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Votre nom
                      </label>
                      <Field
                        type='text'
                        name='nom'
                        id='nom'
                        className='form-control'
                      />
                      <div className='text-red-500 text-[12px] mt-1'>
                        <ErrorMessage name='nom' />
                      </div>
                    </div>
                    <div className='w-1/2'>
                      <label
                        htmlFor='prenom'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Votre prenom
                      </label>
                      <Field
                        type='text'
                        name='prenom'
                        id='prenom'
                        className='form-control'
                      />
                      <div className='text-red-500 text-[12px] mt-1'>
                        <ErrorMessage name='prenom' />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Votre email
                    </label>
                    <Field
                      type='email'
                      name='email'
                      id='email'
                      className='form-control'
                      placeholder='nom@entreprise.com'
                    />{' '}
                    <div className='text-red-500 text-[12px] mt-1'>
                      <ErrorMessage name='email' />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor='password'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Mot de passe
                    </label>
                    <Field
                      type='password'
                      name='password'
                      id='password'
                      placeholder='••••••••'
                      className='form-control'
                    />
                    <div className='text-red-500 text-[12px] mt-1'>
                      <ErrorMessage name='password' />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor='confirm-password'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Confirmer le mot de passe
                    </label>
                    <Field
                      type='password'
                      name='confirm-password'
                      id='confirm-password'
                      placeholder='••••••••'
                      className='form-control'
                    />
                    <div className='text-red-500 text-[12px] mt-1'>
                      <ErrorMessage name='confirm-password' />
                    </div>
                  </div>
                  <div className='flex items-start'>
                    <div className='flex items-center h-5'>
                      <Field
                        type='checkbox'
                        name='terms'
                        id='terms'
                        className='form-checkbox focus:ring-transparent text-primary-600 w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600'
                      />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label
                        htmlFor='terms'
                        className='font-light text-gray-500 dark:text-gray-300'
                      >
                        J'accepte les{' '}
                        <a
                          className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                          href='#'
                        >
                          Termes et Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  <div className='text-red-500 text-[12px] mt-1'>
                    <ErrorMessage name='terms' />
                  </div>
                  <button
                    type='submit'
                    className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                  >
                    Créer un compte
                  </button>
                  <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                    Vous avez déjà un compte ?{' '}
                    <Link
                      to='/auth/login'
                      className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                    >
                      Connectez-vous ici
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
