import styles from './RowItem.module.css';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import State from '../../ui/State';

function RowItem(props) {
  const item = props.item;
  const deleteHandler = props.onDelete;

  return (
    <div className={styles.container}>
      <Link
        className={styles.link}
        to={{
          pathname: '/activite/' + item._id,
        }}
      >
        <div style={{ width: '9%' }} className={styles.item}>
          <span className={styles.light}>{item._id}</span>
        </div>
        <div style={{ width: '16%' }} className={styles.item}>
          <span className={styles.bold}>{item.intitule}</span>
        </div>
        <div style={{ width: '8%' }} className={styles.item}>
          <State element={item.etat} />
        </div>
        <div style={{ width: '12%' }} className={styles.item}>
          <span className={styles.light}>{item.dateCreation}</span>
        </div>
        <div style={{ width: '16%' }} className={styles.item}>
          <span className={styles.bold}>
            {item.client ? item.client.intitule : 'Aucun'}
          </span>
        </div>
        <div style={{ width: '12%' }} className={styles.item}>
          <State element={item.typeActivite} />
        </div>
        <div style={{ width: '10%' }} className={styles.item}>
          <span className={styles.light}>{item.bugetVente}</span>
        </div>
        <div style={{ width: '2%' }} className={styles.item}>
          <span className={styles.light}>{item.quantite}</span>
        </div>
      </Link>
      <div style={{ width: '15%' }} className={styles.item}>
        <Link to={{ pathname: `/activite/modifier/${item._id}` }}>
          <FiEdit style={{ color: '#5FACC9' }} className={styles.icon} />
        </Link>
        <MdDeleteForever
          style={{ color: '#F32013' }}
          className={styles.icon}
          onClick={() => {
            deleteHandler(item._id);
            console.log(`Deleted Produit ${item._id}`);
          }}
        />
      </div>
    </div>
  );
}

export default RowItem;
