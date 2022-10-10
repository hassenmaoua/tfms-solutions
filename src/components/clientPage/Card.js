import styles from './Card.module.css';
import {
  FaIdCard,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelopeOpen,
} from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';

function Card(props) {
  const client = props.client;
  const editHandler = props.onEdit;
  const deleteHandler = props.onDelete;

  return (
    <div className={styles.container}>
      <div className={styles.informations}>
        <div className={styles.photo}>
          <img alt={client.intitule} src={client.photo} />
          <div className={styles.actions}>
            <FiEdit
              style={{ color: '#5FACC9' }}
              className={styles.icon}
              onClick={() => {
                editHandler(client);
              }}
            />
            <MdDeleteForever
              style={{ color: '#F32013' }}
              className={styles.icon}
              onClick={() => {
                deleteHandler(client);
              }}
            />
          </div>
        </div>
        <div className={styles.details}>
          <span className={styles.name}>{client.intitule}</span>
          <span className={styles.identity}>
            <FaIdCard /> <p>{client.identifiantFiscal}</p>
          </span>
          <span className={styles.phone}>
            <FaPhoneAlt />
            <p>{client.phone}</p>
          </span>
          <span className={styles.email}>
            <FaEnvelopeOpen />
            <p>{client.email}</p>
          </span>
          <span className={styles.address}>
            <FaMapMarkerAlt />
            <p>{client.adresse}</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
