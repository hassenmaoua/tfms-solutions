import styles from './InputFormatter.module.css';

function InputFormatter(props) {
  const height = props.hint ? '48px' : '34px';

  return (
    <div
      style={{ width: props.width, height: height }}
      className={styles.container}
    >
      <label className={styles.label}>{props.label}</label>
      {props.children}
      <span>{props.hint}</span>
    </div>
  );
}

export default InputFormatter;
