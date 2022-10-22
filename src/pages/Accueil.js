import React from 'react';
import Layout from '../components/layout/Layout';

import Dashboard from '../components/home/Dashboard';
import ModuleNavigation from '../components/home/ModuleNavigation';

function Accueil() {
  return (
    <Layout>
      <div style={{ display: 'flex' }}>
        <ModuleNavigation />
        <Dashboard />
      </div>
    </Layout>
  );
}

export default Accueil;
