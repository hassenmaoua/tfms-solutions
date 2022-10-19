import React, { useState } from 'react';
import { uid } from 'uid';
import { useNavigate } from 'react-router-dom';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import incrementString from './incrementString';
import styles from './InvoiceForm.module.css';

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('-');
}

const date = new Date();
const today = formatDate(date);

function InvoiceForm() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState('Saleh El Behy');
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([
    {
      id: uid(6),
      name: '',
      qty: 1,
      price: '1.00',
    },
  ]);

  const clientList = [
    {
      _id: 0,
      intitule: 'Test',
    },
    {
      _id: 1,
      intitule: 'Test1',
    },
    {
      _id: 2,
      intitule: 'Test2',
    },
  ];

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
        id: uid(6),
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
    console.log(event.target);
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
        <h1>Bon de Livraison</h1>
        <div className={styles.coordonner}>
          <label htmlFor='cashierName'>Createur :</label>
          <input
            required
            disabled
            placeholder='Nom createur'
            type='text'
            name='cashierName'
            id='cashierName'
            value={cashierName}
            onChange={(event) => setCashierName(event.target.value)}
          />
          <label htmlFor='customerName'>Bénéficiaire :</label>
          <select
            required
            name='customerName'
            id='customerName'
            className={styles.select}
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
          >
            <option value='' defaultValue hidden>
              Nom client
            </option>
            {clientList.length
              ? clientList.map((item, index) => {
                  return (
                    <option key={index} value={item._id}>
                      {item.intitule}
                    </option>
                  );
                })
              : ''}
          </select>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '60%' }}>Designation</th>
              <th style={{ width: '10%', minWidth: 60 }}>Qté</th>
              <th style={{ width: '20%', textAlign: 'center', minWidth: 120 }}>
                Prix Unitaire
              </th>
              <th style={{ width: '10%', textAlign: 'center', minWidth: 60 }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <InvoiceItem
                key={item._id}
                id={item._id}
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
              today,
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
