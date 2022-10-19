import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../assets/images/base/logo_white.png';
function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={logo} alt='logo.png' />
      </div>

      <div className={styles.header}>
        <Link to='/signup'>SIGN UP</Link>
        <Link to='/login'>SIGN IN</Link>
      </div>
    </div>
  );
}

export default Header;
