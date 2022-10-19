import styles from './Item.module.css';
import { useEffect } from 'react';

function Item(props) {
  useEffect(() => {
    console.log('picture loaded');
  }, []);

  return (
    <div className={styles.container}>
      <img src={require('../assets/images/freepik/' + props.image + '.jpg')} />
    </div>
  );
}

export default Item;
