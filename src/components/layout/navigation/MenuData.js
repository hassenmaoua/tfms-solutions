import { FcSettings, FcServices, FcAbout } from 'react-icons/fc';
import styles from './Menu.module.css';

export const MenuData = [
  {
    title: 'Paramètres du compte',
    path: '/settings',
    icon: <FcSettings />,
    cName: styles.text,
  },
  {
    title: 'Configurations',
    path: '/configuration',
    icon: <FcServices />,
    cName: styles.text,
  },
  {
    title: 'À propos du site',
    path: '/about',
    icon: <FcAbout />,
    cName: styles.text,
  },
];
