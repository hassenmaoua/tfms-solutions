import styles from './BodyList.module.css';
import RowItem from './RowItem';

const data = [];

function BodyList() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ width: '10vw' }}>
          <span>référence</span>
        </div>
        <div style={{ width: '10vw' }}>
          <span>date</span>
        </div>
        <div style={{ width: '20vw' }}>
          <span>bénéficiaire</span>
        </div>
        <div style={{ width: '9vw' }}>
          <span>status</span>
        </div>
        <div style={{ width: '12vw' }}>
          <span>montant TTC</span>
        </div>
        <div style={{ width: '16vw' }}>
          <span>actions</span>
        </div>
      </div>

      {data.length ? (
        data.map((item, index) => {
          return <RowItem key={index} item={item} />;
        })
      ) : (
        <h2>Aucun donneés disponible</h2>
      )}
    </div>
  );
}

export default BodyList;
