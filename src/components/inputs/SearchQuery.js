import styles from './SearchQuery.module.css';

function SearchQuery(props) {
  return (
    <div className={styles.container}>
      <input
        spellCheck={false}
        type='text'
        className={styles.input}
        placeholder={props.placeholder}
      />
      <props.icon className={styles.icon} />
    </div>
  );
}

export default SearchQuery;
