import styles from './Item.module.css';
import { useEffect } from 'react';

function Item(props) {
  const item = props.item;
  useEffect(() => {
    console.log('picture loaded');
  }, []);

  return (
    <div className={styles.container}>
      <h1>{item.title}</h1>
      <span>{item.content}</span>
      <img
        src={require('../assets/images/freepik/' + item.filename + '.jpg')}
        alt={item.filename}
      />
    </div>
  );
}

export default Item;
