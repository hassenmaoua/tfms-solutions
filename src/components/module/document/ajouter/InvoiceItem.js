import React, { useState } from 'react';
import styles from './InvoiceItem.module.css';

const InvoiceItem = ({
  id,
  className,
  name,
  qty,
  price,
  onDeleteItem,
  onEditItem,
  produitList,
  onSetItem,
}) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  return (
    <tr>
      <td>
        <select
          className={className}
          id={id}
          value={name}
          type='text'
          placeholder='Item name'
          name='intitule'
          onChange={(e) => {
            onEditItem(e);
            onSetItem(
              e,
              produitList[e.target.value].quantite,
              produitList[e.target.value].bugetVente
            );
          }}
        >
          {produitList
            ? produitList.map((item, index) => (
                <option value={item._id} key={index}>
                  {item.intitule}
                </option>
              ))
            : ''}
        </select>
      </td>
      <td>
        <input
          onChange={(event) => onEditItem(event)}
          value={qty}
          name='quantite'
          type='number'
          min='1'
          id={id}
        />
      </td>
      <td>
        <input
          style={{ textAlign: 'right' }}
          onChange={(event) => {
            console.log(event);
            onEditItem(event);
          }}
          value={price}
          name='bugetVente'
          type='number'
          min='0.01'
          step='0.01'
          id={id}
        />
      </td>
      <td
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button className={styles.delete} onClick={deleteItemHandler}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            style={{ width: 24, height: 24 }}
            fill='none'
            viewBox='0 2 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default InvoiceItem;
