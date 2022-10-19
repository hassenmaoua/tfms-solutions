import { NavLink, useLocation } from 'react-router-dom';
import style from './MainNavigation.module.css';
import LOGO from '../../assets/images/logo_small.png';
import Menu from './Menu';

function MainNavigation() {
  const location = useLocation();

  const classNameFunc = ({ isActive }) =>
    ['/home', '/activite', '/client', '/document'].includes(location.pathname)
      ? isActive
        ? style.activeClass
        : ''
      : '';
  return (
    <header className={style.headerWrapper}>
      <Menu />
      <div className={style.logo}>
        <img src={LOGO} alt='Logo' />
      </div>

      <nav className={style.navWrapper}>
        <div className={style.navigation}>
          <NavLink to='/home' className={classNameFunc}>
            Accueil
          </NavLink>
          <NavLink to='/activite' className={classNameFunc}>
            Activité
          </NavLink>
          <NavLink to='/client' className={classNameFunc}>
            Clientèle
          </NavLink>
          <NavLink to='/document' className={classNameFunc}>
            Document
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
