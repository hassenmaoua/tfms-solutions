import CSS from './ModuleNavigation.module.css';

import React from 'react';
import ImageButton from './ImageButton';

import { FaFileInvoiceDollar, FaCogs, FaUserFriends } from 'react-icons/fa';

function ModuleNavigation() {
  return (
    <div className={CSS.container}>
      <ImageButton title='Facture' icon={FaFileInvoiceDollar} path='/facture' />
      <ImageButton title='Produit' icon={FaCogs} path='/produit' />
      <ImageButton title='Client' icon={FaUserFriends} path='/client' />
    </div>
  );
}

export default ModuleNavigation;
