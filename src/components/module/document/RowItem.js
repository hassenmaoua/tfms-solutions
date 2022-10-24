import styles from './RowItem.module.css';
import { FiEdit, FiEye } from 'react-icons/fi';
import { TiCancel } from 'react-icons/ti';
import State from '../../ui/State';

function RowItem(props) {
  const item = props.item;
  const setDocument = props.setDocument;
  const clickHandler = () => {
    setIsOpen(true);
    setDocument(item);
  };
  const setIsOpen = props.setIsOpen;
  return (
    <div className={styles.container} onClick={clickHandler}>
      <div style={{ width: '20%' }} className={styles.item}>
        <span>
          {item.intitule} N°{item.dopiece}
        </span>
      </div>
      <div style={{ width: '10%' }} className={styles.item}>
        <span>{item.dateDoc}</span>
      </div>
      <div style={{ width: '20%' }} className={styles.item}>
        <span>{item.client.intitule}</span>
      </div>
      <div style={{ width: '10%' }} className={styles.item}>
        <span>
          <State element={item.etat} />
        </span>
      </div>
      <div style={{ width: '20%' }} className={styles.item}>
        {item.montantTTC.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} TND
      </div>

      <div
        style={{ width: '20%' }}
        className={`${styles.actions} ${styles.item}`}
      >
        <span>
          <FiEye style={{ color: '#5FACC9' }} className={styles.icon} />
          <FiEdit style={{ color: '#5FACC9' }} className={styles.icon} />
          <TiCancel style={{ color: '#F32013' }} className={styles.icon} />
        </span>
      </div>
    </div>
  );
}

export default RowItem;
