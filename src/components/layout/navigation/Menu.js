import { useState, useEffect } from 'react';
import styles from './Menu.module.css';
import { Link } from 'react-router-dom';
import { CgMenuRound, CgArrowRightO } from 'react-icons/cg';
import { MenuData } from './MenuData';
import { useNavigate } from 'react-router-dom';
import { FcImport } from 'react-icons/fc';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useLogout from '../../../hooks/useLogout';

function Menu() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const logout = useLogout();

  const navigate = useNavigate();

  const [profile, setProfile] = useState({});

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function getUser() {
      try {
        const response = await axiosPrivate.get('/user', {
          signal: controller.signal,
        });
        isMounted && setProfile(response.data);
      } catch (err) {
        console.log(err.message);
      }
    }

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  async function logoutHandler() {
    await logout();
    console.log('Deconnecter');
    navigate('/login');
  }

  return (
    <>
      {sidebar && <div onClick={showSidebar} className={styles.backdrop} />}

      <div className={styles.menu}>
        <Link onClick={showSidebar}>
          {sidebar ? (
            <CgArrowRightO className={styles.iconArrow} />
          ) : (
            <CgMenuRound className={styles.iconMenu} />
          )}
        </Link>
      </div>

      <nav
        className={
          sidebar ? `${styles.container} ${styles.active}` : styles.container
        }
      >
        <div className={styles.profile}>
          <div className={styles.photoContainer}>
            <img src={profile.photo} alt='Profile.png' />
          </div>
          <div className={styles.nameContainer}>
            <span>
              {profile.nom} {profile.prenom}
            </span>
          </div>
        </div>

        <ul className={styles.menuItems}>
          {MenuData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path} className={styles.link}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={styles.text}>
          <button
            onClick={() => {
              logoutHandler();
            }}
            className={styles.link}
          >
            <FcImport />
            <span>Déconnecter</span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Menu;
