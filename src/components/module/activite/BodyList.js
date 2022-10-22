import styles from './BodyList.module.css';

import RowItem from './RowItem';

function BodyList(props) {
  const response = props.response;
  const data = response.data;

  const filteredData = data.filter((produit) => {
    if (props.filterInput === '') {
      return produit;
    } else {
      return produit.intitule.toLowerCase().includes(props.filterInput);
    }
  });

  if (response.status)
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div style={{ width: '9%' }}>
            <span>ID</span>
          </div>
          <div style={{ width: '16%' }}>
            <span>intitulé</span>
          </div>
          <div style={{ width: '8%' }}>
            <span>État</span>
          </div>
          <div style={{ width: '12%' }}>
            <span>Date Creation</span>
          </div>
          <div style={{ width: '16%' }}>
            <span>Client</span>
          </div>
          <div style={{ width: '12%' }}>
            <span>Type activité</span>
          </div>
          <div style={{ width: '10%' }}>
            <span>Buget Vente</span>
          </div>
          <div style={{ width: '2%' }}>
            <span>Qté</span>
          </div>
          <div style={{ width: '15%' }}>
            <span>Actions</span>
          </div>
        </div>

        {filteredData.length ? (
          filteredData.map((item, index) => {
            return (
              <RowItem key={index} item={item} onDelete={props.onDelete} />
            );
          })
        ) : (
          <h2>Aucun donneés disponible</h2>
        )}
      </div>
    );
  else return <h1>{response.message}</h1>;
}

export default BodyList;
