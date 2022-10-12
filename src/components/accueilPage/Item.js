import styles from './Item.module.css';

function Item(props) {
  return (
    <div className={styles.container}>
      <img src={require('../assets/images/freepik/' + props.image + '.jpg')} />
    </div>
  );
}

export default Item;
