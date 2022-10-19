import React from 'react';
import CSS from './Input.module.css';

function Input(props) {
  return props.type === 'checkbox' ? (
    <div className={CSS.checkboxControl}>
      <input type={props.type} id={props.id} />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  ) : (
    <div className={CSS.textControl}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        autoComplete='none'
        refc={props.ref}
        spellCheck={false}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}

export default Input;
