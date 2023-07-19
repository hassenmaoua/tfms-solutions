import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Error404 from './components/Error404';
import Error403 from './components/Error403';

const ErrorPage = () => {
  return (
    <Routes>
      <Route>
        <Route path='404' element={<Error404 />} />
        <Route path='403' element={<Error403 />} />
        <Route index element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default ErrorPage;
