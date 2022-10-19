import styles from './IconButton.module.css';

function IconButton(props) {
  const buttonStyle = {
    color: props.color,
    backgroundColor: props.color + '25',
  };

  return (
    <button
      style={buttonStyle}
      className={`${styles.btn} ${buttonStyle}`}
      onClick={props.onClick}
    >
      <props.icon className={styles.icon} />
      {props.children}
    </button>
  );
}

export default IconButton;
