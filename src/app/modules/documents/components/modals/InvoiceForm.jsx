import React, { useState } from 'react';
import { uid } from 'uid';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import incrementString from '../../../../../assets/helpers/incrementString';

const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const InvoiceForm = () => {
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
    <form
      className='relative flex space-x-6 min-h-[500px] text-left'
      onSubmit={reviewInvoiceHandler}
    >
      <div className='w-2/3 min-w-[500px]'>
        <div className='flex flex-col justify-center border-b border-gray-900/10 pb-4'>
          <div className='flex flex-row justify-start'>
            <span className='block text-sm font-medium leading-6 text-gray-900 mr-1'>
              Date :
            </span>
            <span className='block text-sm leading-6 text-gray-900'>
              {today}
            </span>
          </div>

          <select className='text-center text-2xl leading-5 mx-auto font-medium rounded focus:ring-0 focus:outline-none bg-gray-50 border border-gray-300 focus:border-gray-300 text-gray-800 mt-4'>
            <option value='FAC'>Facture</option>
            <option value='BON'>Bon de livraison</option>
          </select>
        </div>

        <div className='grid grid-cols-2 gap-2 pt-4 pb-8'>
          <div>
            <label
              htmlFor='cashierName'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Client
            </label>
            <select
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-0 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              placeholder='Cashier name'
              type='text'
              name='cashierName'
              id='cashierName'
              value={cashierName}
              onChange={(event) => setCashierName(event.target.value)}
            >
              <option>Client 1</option>
              <option>Client 2</option>
              <option>Client 3</option>
            </select>
          </div>
        </div>
        <table className='p-4 text-left'>
          <thead>
            <tr className='border-b border-gray-900/10 text-sm leading-6 text-gray-900'>
              <th scope='col' className='font-medium w-7/12'>
                Designation
              </th>
              <th scope='col' className='font-medium w-2/12 min-w-[80px]'>
                Qté
              </th>
              <th scope='col' className='font-medium w-2/12 min-w-[120px]'>
                Prix Unitaire
              </th>
              <th
                scope='col'
                className='font-medium w-1/12 min-w-[60px] text-center'
              >
                Action
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
        <button
          className='rounded-md mt-1 bg-primary-600 px-4 py-2 text-sm text-white shadow-sm hover:bg-primary-700'
          type='button'
          onClick={addItemHandler}
        >
          Ajouter Article
        </button>
      </div>
      <div className='w-1/3 h-full flex flex-col justify-between'>
        <div>
          <button
            className='w-full rounded-md bg-primary-600 py-2 text-sm text-white shadow-sm hover:bg-primary-700'
            type='submit'
          >
            Valide
          </button>
          <button
            className='w-full rounded-md bg-red-600 py-2 text-sm text-white shadow-sm hover:bg-red-700 mt-2'
            type='reset'
          >
            Annuler
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
          <div className='space-y-4 py-2'>
            <div className='space-y-2'>
              <label
                className='block text-sm font-medium leading-6 text-gray-900 mr-1'
                htmlFor='tax'
              >
                Taux TVA
              </label>
              <div className='relative mt-2 rounded-md shadow-sm'>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                  <span className='text-gray-500 sm:text-sm'>%</span>
                </div>
                <input
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-0 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 pr-8'
                  type='number'
                  name='tax'
                  id='tax'
                  min='0.01'
                  step='0.01'
                  placeholder='0.0'
                  value={tax}
                  onChange={(event) => setTax(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='absolute bottom-0 right-0 w-1/3 flex flex-col justify-between space-y-2 pt-6'>
          <div className='flex flex-row justify-between'>
            <span className='font-medium'>Total HT :</span>
            <span>
              {Number(subtotal)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
              TND
            </span>
          </div>

          {true && (
            <div className='flex flex-row justify-between'>
              <span className='font-medium'>Timber :</span>
              <span>{Number(taxRate).toFixed(3)} TND</span>
            </div>
          )}

          <div className='flex flex-row justify-between'>
            <span className='font-medium'>TVA :</span>
            <span>({tax || '0'}%) </span>
          </div>

          <div className='flex flex-row justify-between pt-2 border-t border-gray-300'>
            <span className='font-medium'>Total TTC:</span>
            <span className='font-medium'>
              {subtotal % 1 === 0
                ? subtotal
                : Number(subtotal)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
              TND
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
