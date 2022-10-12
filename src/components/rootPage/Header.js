import { Link } from 'react-router-dom';
import styles from './Header.module.css';
function Header() {
  return (
    <div className={styles.container}>
      <h1>Lathe Mill Workshop</h1>
      <div className={styles.header}>
        <Link to='/signup'>SIGN UP</Link>
        <Link to='/login'>SIGN IN</Link>
      </div>
    </div>
  );
}

export default Header;
