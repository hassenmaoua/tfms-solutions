import { FiEdit, FiEye } from 'react-icons/fi';
import State from '../ui/State';

import { TiCancel } from 'react-icons/ti';

import styles from './RowItem.module.css';

function RowItem(props) {
  const item = props.item;
  return (
    <div className={styles.container}>
      <div style={{ width: '10vw' }} className={styles.item}>
        <span>{item.dopiece}</span>
      </div>
      <div style={{ width: '10vw' }} className={styles.item}>
        <span>{item.datec}</span>
      </div>
      <div style={{ width: '20vw' }} className={styles.item}>
        <span>{item.benef}</span>
      </div>
      <div style={{ width: '9vw' }} className={styles.item}>
        <span>
          <State element={item.status} />
        </span>
      </div>
      <div style={{ width: '12vw' }} className={styles.item}>
        {item.montantTTC}
      </div>

      <div
        style={{ width: '16vw' }}
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
