import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import React from 'react';
import CustomPanel from './CustomPanel';

const ModulesTabs = () => {
  const [activeTab, setActiveTab] = React.useState('Activités');
  const data = [
    {
      label: 'Gestion et Contrôle des Produits',
      value: 'Activités',
      image: '/media/storyset/manufacturing-process-animate.svg',
      desc: `Nous comprenons l'importance d'une gestion efficace des produits et des activités pour assurer la rentabilité de votre entreprise. Notre équipe d'experts vous aidera à mettre en place des processus solides pour optimiser vos opérations, suivre les stocks, gérer les fournisseurs et contrôler les factures..`,
    },
    {
      label: 'Communication Efficace avec les Clients',
      value: 'Clients',
      image: '/media/storyset/new-team-members-animate.svg',
      desc: `Nous vous accompagnons dans l'établissement d'une communication efficace avec vos clients. Nous vous aidons à développer des stratégies de communication ciblées pour améliorer la relation avec vos clients, répondre à leurs besoins et renforcer leur fidélité..`,
    },
    {
      label: 'Gestionnaire des facture',
      value: 'Documents',
      image: '/media/storyset/invoice-animate.svg',
      desc: `Un ensemble complet pour tous vos besoins en matière de facturation,
            de l'envoi de devis aux factures, en passant par l'enregistrement
            d'un paiement.`,
    },
  ];
  return (
    <Tabs className='h-auto' value={activeTab}>
      <TabsHeader
        className='rounded-none border-b border-primary-gray-50 text-gray-700 dark:text-gray-400 bg-transparent hover:cursor-pointer py-0 px-20'
        indicatorProps={{
          className:
            'bg-transparent border-b-2 border-primary-500 shadow-none rounded-none',
        }}
      >
        {data.map(({ value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? 'text-primary-500' : ''}
          >
            <h2 className='text-2xl font-bold'>{value}</h2>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ label, value, image, desc }) => (
          <TabPanel key={value} value={value}>
            <CustomPanel label={label} src={image} desc={desc} />
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};
export default ModulesTabs;
