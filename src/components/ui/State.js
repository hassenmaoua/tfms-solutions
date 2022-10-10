import styles from './State.module.css';

function State(props) {
  const state = props.element;
  const color = state.style;
  return (
    <div
      style={{
        color: color,
        backgroundColor: color + '25',
      }}
      className={styles.container}
    >
      <span className={styles.span}>{state.label}</span>
    </div>
  );
}

export default State;
