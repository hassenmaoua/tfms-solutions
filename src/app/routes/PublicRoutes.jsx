import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../modules/auth/Login';
import Register from '../modules/auth/Register';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path='/auth/login' element={<Login />} />
      <Route path='/auth/register' element={<Register />} />
      <Route path='*' element={<Navigate to='/error/404' />} />

      <Route path='/home' element={<Navigate to='/error/403' />} />
      <Route path='/activites' element={<Navigate to='/error/403' />} />
      <Route path='/clients' element={<Navigate to='/error/403' />} />
      <Route path='/documents' element={<Navigate to='/error/403' />} />
    </Routes>
  );
};

export default PrivateRoutes;
