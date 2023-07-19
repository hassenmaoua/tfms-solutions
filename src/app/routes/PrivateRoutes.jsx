import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MasterLayout from '../../assets/layouts/MasterLayout';
import Home from '../pages/Home';
import Activites from '../pages/Activites';
import Clients from '../pages/Clients';
import Documents from '../pages/Documents';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/activites' element={<Activites />} />
        <Route path='/clients' element={<Clients />} />
        <Route path='/documents' element={<Documents />} />
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
