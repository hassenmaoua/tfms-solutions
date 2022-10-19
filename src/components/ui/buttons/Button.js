import React from 'react';
import styles from './Button.module.css';

function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.btn} ${styles[props.x ? props.x : '']}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
