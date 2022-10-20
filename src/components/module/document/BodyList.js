import styles from './BodyList.module.css';
import RowItem from './RowItem';

const data = [
  {
    _id: 1,
    intitule: 'Bon de Livraison',
    dopiece: 1,
    dateDoc: '19-10-2022',
    articles: [
      {
        _id: 834709,
        intitule: 'Produit Test',
        quantite: 1,
        bugetVente: 100,
      },
      {
        _id: 228127,
        intitule: 'Bar 60 Mm / 1.5 M',
        quantite: 10,
        bugetVente: 30,
      },
    ],
    montantHT: 400,
    montantTVA: 19,
    remise: 0.6,
    montantTTC: 476.6,
    etat: {
      _id: 10,
      code: 'ETD',
      label: 'Nouveau',
      style: '#00FF00',
    },
    client: {
      _id: 4,
      intitule: 'Khider Karawita',
      identifiantFiscal: 'BE0123456789',
      adresse: "2 Rue l'independance, Msaken, Sousse 4070",
    },
    docCreateur: {
      _id: 0,
      label: 'Saleh El Behy',
      identifiantFiscal: '8475-A-X-F-777',
    },
  },

  {
    _id: 2,
    intitule: 'Bon de Livraison',
    dopiece: 2,
    dateDoc: '19-10-2022',
    articles: [
      {
        _id: 834709,
        intitule: 'Produit Test',
        quantite: 1,
        bugetVente: 100,
      },
      {
        _id: 228127,
        intitule: 'Bar 60 Mm / 1.5 M',
        quantite: 10,
        bugetVente: 30,
      },
    ],
    montantHT: 400,
    montantTVA: 19,
    remise: 0.6,
    montantTTC: 476.6,
    etat: {
      _id: 10,
      code: 'ETD',
      label: 'Nouveau',
      style: '#00FF00',
    },
    client: {
      _id: 4,
      intitule: 'Khider Karawita',
      identifiantFiscal: 'BE0123456789',
      adresse: "2 Rue l'independance, Msaken, Sousse 4070",
    },
    docCreateur: {
      _id: 0,
      label: 'Saleh El Behy',
      identifiantFiscal: '8475-A-X-F-777',
    },
  },

  {
    _id: 3,
    intitule: 'Facture',
    dopiece: 1,
    dateDoc: '19-10-2022',
    articles: [
      {
        _id: 834709,
        intitule: 'Produit Test',
        quantite: 1,
        bugetVente: 100,
      },
      {
        _id: 228127,
        intitule: 'Bar 60 Mm / 1.5 M',
        quantite: 10,
        bugetVente: 30,
      },
    ],
    montantHT: 400,
    montantTVA: 19,
    remise: 0.6,
    montantTTC: 476.6,
    etat: {
      _id: 10,
      code: 'ETD',
      label: 'Saisie',
      style: '#AAAA00',
    },
    client: {
      _id: 4,
      intitule: 'Khider Karawita',
      identifiantFiscal: 'BE0123456789',
      adresse: "2 Rue l'independance, Msaken, Sousse 4070",
    },
    docCreateur: {
      _id: 0,
      label: 'Saleh El Behy',
      identifiantFiscal: '8475-A-X-F-777',
    },
  },
];

function BodyList(props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ width: '20%' }}>
          <span>Reference</span>
        </div>
        <div style={{ width: '10%' }}>
          <span>date</span>
        </div>
        <div style={{ width: '20%' }}>
          <span>bénéficiaire</span>
        </div>
        <div style={{ width: '10%' }}>
          <span>status</span>
        </div>
        <div style={{ width: '20%' }}>
          <span>total TTC</span>
        </div>
        <div style={{ width: '20%' }}>
          <span>actions</span>
        </div>
      </div>

      {data.length ? (
        data.map((item, index) => {
          return (
            <RowItem
              key={index}
              item={item}
              setDocument={props.setDocument}
              setIsOpen={props.setIsOpen}
            />
          );
        })
      ) : (
        <h2>Aucun donneés disponible</h2>
      )}
    </div>
  );
}

export default BodyList;
