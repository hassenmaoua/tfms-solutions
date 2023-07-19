import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import './assets/styles/tailwind.css';
import AppRoutes from './app/routes/AppRoutes';
import { AuthProvider } from './app/modules/auth/AuthProvider';
import { setupAxios } from './app/modules/auth/core/AuthHelpers';
import axios from 'axios';
setupAxios(axios);

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
