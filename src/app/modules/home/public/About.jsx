import React from 'react';
import { toAbsoluteUrl } from '../../../../assets/helpers';
const About = ({ className }) => {
  return (
    <div
      className={`${className} bg-white dark:bg-gray-800 m-4 rounded-lg flex flex-wrap h-screen pt-8 px-8`}
    >
      <div className='flex flex-col items-center justify-center w-1/2'>
        <h2 className='mb-4 text-4xl text-center w-full tracking-tight font-extrabold text-center text-gray-700 dark:text-gray-200'>
          À propos
        </h2>
        <img
          className='mb-5 h-32'
          src={toAbsoluteUrl('/media/logos/logo.png')}
          alt='logo.png'
        />
        <p className='text-justify mb-6 text-lg font-normal text-gray-500 sm:px-8 xl:px-16 dark:text-gray-400'>
          TFMS Solutions est une entreprise tunisienne en pleine croissance.
          Notre atelier se concentre sur la gestion et le contrôle des produits,
          ainsi que sur une communication efficace avec les clients.
          <br />
          <br /> Notre expertise couvre diverses opérations de tournage,
          d'alésage, de perçage et de la conception initiale de la production
          sur site. Nous accordons une grande importance à la livraison
          ponctuelle et respectons les délais convenus. Notre objectif principal
          est de satisfaire pleinement les attentes de nos travailleurs.
          <br />
          <br />
          Nous vous accompagnons dans l'optimisation de vos opérations, la
          gestion des fournisseurs et le contrôle des factures.
        </p>
        <button className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'>
          Découvrez plus
          <svg
            className='w-5 h-5 ml-2 -mr-1'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
      <img
        className='w-1/2'
        src={toAbsoluteUrl('/media/storyset/maintenance-animate.svg')}
        alt='maintenance-animate.svg'
      />
    </div>
  );
};

export default About;
