import React from 'react';
import { toAbsoluteUrl } from '../../../../assets/helpers';

const Contact = ({ className }) => {
  return (
    <div
      className={`${className} bg-white dark:bg-gray-800 m-4 rounded-lg flex h-screen p-8`}
    >
      <img
        src={toAbsoluteUrl('/media/storyset/example-animate.svg')}
        alt='example-animate.svg'
      />
      <section className='bg-transparent'>
        <div className='py-8 lg:py-16 px-4 mx-auto max-w-screen-md'>
          <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-700 dark:text-gray-200'>
            Contactez-nous
          </h2>
          <p className='mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl'>
            Vous avez un problème technique ? Besoin d'informations sur notre
            plan Business ? Faites-nous savoir.
          </p>
          <form action='#' className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Votre adresse e-mail
              </label>
              <input
                type='email'
                id='email'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
                placeholder='nom@flowbite.com'
                required=''
              />
            </div>
            <div>
              <label
                htmlFor='subject'
                className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Sujet
              </label>
              <input
                type='text'
                id='subject'
                className='block p-3 w-full text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
                placeholder='Indiquez comment nous pouvons vous aider'
                required=''
              />
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='message'
                className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400'
              >
                Votre message
              </label>
              <textarea
                id='message'
                rows={6}
                className='block p-2.5 w-full text-sm text-gray-700 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-primary-500 dark:focus:border-primary-500'
                placeholder='Laissez un commentaire...'
                defaultValue={''}
              />
            </div>
            <button
              type='submit'
              className='py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-600 sm:w-fit hover:bg-primary-700'
            >
              Envoyer le message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
