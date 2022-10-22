import CSS from './ModuleNavigation.module.css';

import React from 'react';
import ImageButton from './ImageButton';
import factureImg from '../assets/images/modules/facture.jpg';
import produitImg from '../assets/images/modules/produit.jpg';
import clientImg from '../assets/images/modules/client.png';

function ModuleNavigation() {
  return (
    <div className={CSS.container}>
      <ImageButton
        title='Activité'
        text="Production d'ingénierie structurelle, vous pouvez estimer l'avance de
          production, les extensions aux projets multi-unités"
        image={produitImg}
        path='/activite'
      />

      <ImageButton
        title='Document'
        text="Une suite complète pour tous vos besoins en matière de facturation, de
          l'envoi de devis aux factures, en passant par bon de livraison."
        image={factureImg}
        path='/document'
      />

      <ImageButton
        title='Clientèle'
        text='Contactez nos clients, ou envoyez une copie de votre avance sur
          production.'
        image={clientImg}
        path='/client'
      />
    </div>
  );
}

export default ModuleNavigation;
