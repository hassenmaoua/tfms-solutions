import React, { useRef } from 'react';
import Header from '../modules/home/public/Header';
import About from '../modules/home/public/About';
import Services from '../modules/home/public/Services';
import Contact from '../modules/home/public/Contact';
import Footer from '../modules/home/public/Footer';

const Public = () => {
  const scrollToSection = (elementRef) => {
    if (elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='w-full mx-auto snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth dark:bg-gray-800 snap-time-2'>
      <Header scrollToSection={scrollToSection} />

      <About id='about-section' className='snap-center' />

      <Services id='services-section' className='snap-center' />
      <Contact id='contact-section' className='snap-center' />

      <Footer className='snap-end bg-primary-100' />
    </div>
  );
};

export default Public;
