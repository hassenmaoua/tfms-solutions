import React from 'react';
import Layout from '../components/layout/Layout';

import Dashboard from '../components/accueilPage/Dashboard';
import ModuleNavigation from '../components/accueilPage/ModuleNavigation';

function Accueil() {
  return (
    <Layout>
      <Dashboard />
      <ModuleNavigation />
    </Layout>
  );
}

export default Accueil;
