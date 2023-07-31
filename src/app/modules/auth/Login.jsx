import React from 'react';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toAbsoluteUrl } from '../../../assets/helpers/AssetsHelpers';
import { Link } from 'react-router-dom';
import { ErrorAlert } from '../../../assets/helpers/alertDialogs';
import { useAuth } from './AuthProvider';
import { login, getUserByToken } from './core/requests';

const Login = () => {
  const { saveAuth, setCurrentUser } = useAuth();

  const initialValues = { email: 'salah@demo.com', password: '123' };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Veuillez saisir une adresse e-mail')
      .email('Veuillez saisir une adresse e-mail valide')
      .min(3, 'Minimum 3 symboles'),
    password: Yup.string()
      .required('Veuillez entrer un mot de passe')
      .min(3, 'Minimum 3 symboles'),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await login(values.email, values.password);
      const { token, refreshToken } = response.data;

      saveAuth({ token, refreshToken });

      const data = await getUserByToken();
      setCurrentUser(data.user);
    } catch (error) {
      console.error(error);
      if (error.response.data.message) {
        ErrorAlert('Failed to Login', error.response.data.message);
      } else ErrorAlert('Failed to Login', error.message);
      saveAuth(undefined);
    }
  };

  return (
    <section className='bg-gray-50'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <Link
          to='/'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900'
        >
          <img
            className='h-32'
            src={toAbsoluteUrl('/media/logos/logo.png')}
            alt='logo'
          />
        </Link>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Connectez-vous à votre compte
            </h1>
            <Formik
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              initialValues={initialValues}
            >
              {() => (
                <Form noValidate autoComplete='off' className='md:space-y-6'>
                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm font-medium text-gray-900'
                    >
                      Votre email
                    </label>
                    <Field
                      type='email'
                      name='email'
                      id='email'
                      className='form-control'
                      placeholder='nom@societe.com'
                    />
                    <div className='text-red-500 text-[12px] mt-1'>
                      <ErrorMessage name='email' />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor='password'
                      className='block mb-2 text-sm font-medium text-gray-900'
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

                  <button
                    type='submit'
                    className='w-full text-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-none focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5'
                  >
                    Se connecter
                  </button>

                  <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                    Vous n'avez pas un compte ?{' '}
                    <Link
                      to='/auth/register'
                      className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                    >
                      Register ici
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

export default Login;
