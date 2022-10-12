import CSS from './ModuleNavigation.module.css';

import React from 'react';
import ImageButton from './ImageButton';

import { FaFileInvoiceDollar, FaCogs, FaUserFriends } from 'react-icons/fa';
import factureImg from '../assets/images/facture.jpg';
import produitImg from '../assets/images/produit.jpg';
import clientImg from '../assets/images/client.png';

function ModuleNavigation() {
  return (
    <div className={CSS.container}>
      <ImageButton
        title='Facture'
        text="Une suite complète pour tous vos besoins en matière de facturation, de
          l'envoi de devis aux factures, en passant par l'enregistrement d'un
          paiement."
        image={factureImg}
        path='/facture'
      />
      <ImageButton
        title='Produit'
        text="Production d'ingénierie structurelle, vous pouvez estimer l'avance de
          production, les extensions aux projets multi-unités"
        image={produitImg}
        path='/produit'
      />
      <ImageButton
        title='Client'
        text='Contactez nos clients, ou envoyez une copie de votre avance sur
          production.'
        image={clientImg}
        path='/client'
      />
    </div>
  );
}

export default ModuleNavigation;
