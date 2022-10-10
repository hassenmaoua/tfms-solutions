import { Link } from 'react-router-dom';
import styles from './ImageButton.module.css';

function ImageButton(props) {
  return (
    <Link to={props.path} className={styles.Link}>
      <div className={styles.container}>
        <div className={styles.rectangle}>
          <props.icon className={styles.icon} />
        </div>
        <div className={styles.button}>
          <p>{props.title}</p>
        </div>
      </div>
    </Link>
  );
}

export default ImageButton;
