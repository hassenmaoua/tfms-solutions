import React, { useState } from 'react';
import { uid } from 'uid';
import { useNavigate } from 'react-router-dom';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import incrementString from './incrementString';
import styles from './InvoiceForm.module.css';
const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

function InvoiceForm() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([
    {
      id: uid(6),
      name: '',
      qty: 1,
      price: '1.00',
    },
  ]);

  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: uid(6),
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  };

  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);
  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  return (
    <form className={styles.form} onSubmit={reviewInvoiceHandler}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div style={{ display: 'flex', marginLeft: '0.5rem' }}>
            <span style={{ fontWeight: 700, marginRight: 10 }}>Date :</span>
            <span>{today}</span>
          </div>
          <div
            style={{
              display: 'flex',
              marginLeft: '0.5rem',
              alignItems: 'center',
            }}
          >
            <label style={{ fontWeight: 700 }} htmlFor='invoiceNumber'>
              N° Facture :
            </label>
            <input
              required
              style={{ maxWidth: 130 }}
              type='number'
              name='invoiceNumber'
              id='invoiceNumber'
              min='1'
              step='1'
              value={invoiceNumber}
              onChange={(event) => setInvoiceNumber(event.target.value)}
            />
          </div>
        </div>
        <h1>FACTURE</h1>
        <div className={styles.invoiceItems}>
          <label htmlFor='cashierName'>Createur :</label>
          <input
            required
            style={{ flex: '1 1 0%' }}
            placeholder='Nom createur'
            type='text'
            name='cashierName'
            id='cashierName'
            value={cashierName}
            onChange={(event) => setCashierName(event.target.value)}
          />
          <label htmlFor='customerName'>Client :</label>
          <input
            required
            style={{ flex: '1 1 0%' }}
            placeholder='Nom client'
            type='text'
            name='customerName'
            id='customerName'
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
          />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '60%' }}>ARTICLE</th>
              <th style={{ width: '10%', minWidth: 60 }}>QNT</th>
              <th style={{ width: '20%', textAlign: 'center', minWidth: 120 }}>
                PRIX UNITAIRE
              </th>
              <th style={{ width: '10%', textAlign: 'center', minWidth: 60 }}>
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                name={item.name}
                qty={item.qty}
                price={item.price}
                onDeleteItem={deleteItemHandler}
                onEdtiItem={edtiItemHandler}
              />
            ))}
          </tbody>
        </table>
        <button className={styles.addButton} onClick={addItemHandler}>
          Ajouter Article
        </button>
        <div className={styles.details}>
          <div>
            <span style={{ fontWeight: 700 }}>Total HT :</span>
            <span>{subtotal.toFixed(2)} TND</span>
          </div>
          <div>
            <span style={{ fontWeight: 700 }}>Remise :</span>
            <span>
              ({discount || '0'}%){discountRate.toFixed(2)} TND
            </span>
          </div>
          <div>
            <span style={{ fontWeight: 700 }}>TVA :</span>
            <span>
              ({tax || '0'}%){taxRate.toFixed(2)} TND
            </span>
          </div>
          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid #CCC' }}>
            <span style={{ fontWeight: 700 }}>Total TTC:</span>
            <span style={{ fontWeight: 700 }}>
              {total % 1 === 0 ? total : total.toFixed(2)} TND
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} type='submit'>
            Revoir Facture
          </button>
          <InvoiceModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              invoiceNumber,
              cashierName,
              customerName,
              subtotal,
              taxRate,
              discountRate,
              total,
            }}
            items={items}
            onAddNextInvoice={addNextInvoiceHandler}
          />
          <button
            style={{ marginTop: '0.5rem' }}
            className={styles.button}
            onClick={() => {
              navigate(-1);
            }}
          >
            Annuler
          </button>
          <div className={styles.variables}>
            <div>
              <label htmlFor='tax'>Taux de TVA :</label>
              <div className={styles.inputContainer}>
                <input
                  type='number'
                  name='tax'
                  id='tax'
                  min='0.01'
                  step='0.01'
                  placeholder='0.0'
                  value={tax}
                  onChange={(event) => setTax(event.target.value)}
                />
                <span>%</span>
              </div>
            </div>
            <div>
              <label htmlFor='discount'>Taux remise :</label>
              <div className={styles.inputContainer}>
                <input
                  type='number'
                  name='discount'
                  id='discount'
                  min='0'
                  step='0.01'
                  placeholder='0.0'
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                />
                <span>%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default InvoiceForm;
