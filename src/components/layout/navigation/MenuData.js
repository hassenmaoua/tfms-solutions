import { FcSettings, FcServices, FcAbout } from 'react-icons/fc';
import styles from './Menu.module.css';

export const MenuData = [
  {
    title: 'Paramètres du compte',
    path: '/home',
    icon: <FcSettings />,
    cName: styles.text,
  },
  {
    title: 'Configurations',
    path: '/home',
    icon: <FcServices />,
    cName: styles.text,
  },
  {
    title: 'À propos du site',
    path: '/home',
    icon: <FcAbout />,
    cName: styles.text,
  },
];
