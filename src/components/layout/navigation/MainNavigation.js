import { NavLink, useLocation } from 'react-router-dom';
import style from './MainNavigation.module.css';
import LOGO from '../../assets/images/logo_small.png';
import Menu from './Menu';

function MainNavigation() {
  const location = useLocation();

  const classNameFunc = ({ isActive }) =>
    ['/home', '/produit', '/client', '/facture'].includes(location.pathname)
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
          <NavLink to='/produit' className={classNameFunc}>
            Produit
          </NavLink>
          <NavLink to='/client' className={classNameFunc}>
            Client
          </NavLink>
          <NavLink to='/facture' className={classNameFunc}>
            Facture
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
