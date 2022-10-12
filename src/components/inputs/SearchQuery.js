import styles from './SearchQuery.module.css';

function SearchQuery(props) {
  const searchHandler = props.onSearch;
  return (
    <div className={styles.container}>
      <input
        spellCheck={false}
        type='text'
        className={styles.input}
        placeholder={props.placeholder}
        onChange={(e) => {
          searchHandler(e);
        }}
      />
      <props.icon className={styles.icon} />
    </div>
  );
}

export default SearchQuery;
