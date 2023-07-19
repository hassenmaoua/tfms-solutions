import React from 'react';
import Card from './components/Card';
import ProductionChart from './components/ProductionChart';
import ActivitesStatusChart from './components/ActivitesStatusChart';
import WorkCard from './components/WorkCard';

const Dashboard = () => {
  return (
    <div className='container w-full mx-auto py-5'>
      <div className='flex gap-x-4 mb-4'>
        <div className='w-1/3 bg-white rounded-lg shadow p-4'>
          <h5 className='mb-2 text-2xl font-semibold tracking-tight text-gray-600 dark:text-white mb-10'>
            Graphique des activités par état
          </h5>
          <ActivitesStatusChart />
        </div>
        <div className='w-2/3 bg-white rounded-lg shadow p-4'>
          <h5 className='mb-2 text-2xl font-semibold tracking-tight text-gray-600 dark:text-white'>
            Tendances de l'activité par mois
          </h5>
          <ProductionChart />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        <Card
          title={45}
          icon='/media/icons/activite.svg'
          description={'Activités'}
          link={'/activites'}
        />
        <Card
          title={6}
          icon='/media/icons/clients.svg'
          description={'Clients'}
          link={'/clients'}
        />
        <Card
          title={6}
          icon='/media/icons/document.svg'
          description={'Documents'}
          link={'/documents'}
        />
        <WorkCard
          title={8}
          icon='/media/icons/document.svg'
          description={'Documents'}
          link={'/documents'}
        />
      </div>
    </div>
  );
};

export default Dashboard;
