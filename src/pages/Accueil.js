import React from 'react';
import Layout from '../components/layout/Layout';

import Dashboard from '../components/home/Dashboard';
import ModuleNavigation from '../components/home/ModuleNavigation';

function Accueil() {
  return (
    <Layout>
      <Dashboard />
      <ModuleNavigation />
    </Layout>
  );
}

export default Accueil;
