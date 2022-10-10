import React from 'react';
import styles from './Dashboard.module.css';

function Dashboard() {
  return (
    <div className={styles.container}>
      <div>
        <h1>Bienvenue!</h1>
        <h2>Créer et surveiller vos activités en ligne.</h2>
      </div>
      <div className={styles.chart}></div>
    </div>
  );
}

export default Dashboard;
