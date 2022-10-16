import React from 'react';
import InvoiceField from './InvoiceField';
import styles from './InvoiceItem.module.css';

const InvoiceItem = ({ id, name, qty, price, onDeleteItem, onEdtiItem }) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  return (
    <tr>
      <td>
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            placeholder: 'Item name',
            type: 'text',
            name: 'name',
            id: id,
            value: name,
          }}
        />
      </td>
      <td>
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            type: 'number',
            min: '1',
            name: 'qty',
            id: id,
            value: qty,
          }}
        />
      </td>
      <td>
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            className: 'text-right',
            type: 'number',
            min: '0.01',
            step: '0.01',
            name: 'price',
            id: id,
            value: price,
          }}
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
