import MainNavigation from './navigation/MainNavigation';
import styles from './Layout.module.css';

function Layout(props) {
  return (
    <div>
      <MainNavigation />

      <main className={styles.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
