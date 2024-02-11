import React from 'react';

const InvoiceItem = ({ id, name, qty, price, onDeleteItem, onEdtiItem }) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  return (
    <tr>
      <td className='pr-1 py-1'>
        <div className='w-full'>
          <select
            id={id}
            name={name}
            className='block appearance-none w-full bg-gray-200 border border-gray-200 px-4 pr-8 focus:ring-0 rounded leading-tight focus:outline-none focus:bg-white focus:border-primary-500'
          >
            <option>New Mexico</option>
            <option>Missouri</option>
            <option>Texas</option>
          </select>
        </div>
      </td>
      <td className='pr-1 py-1'>
        <input
          id={id}
          className='block appearance-none w-full bg-gray-200 border border-gray-200 pr-1 focus:ring-0 rounded leading-tight focus:outline-none focus:bg-white focus:border-primary-500 mr-2'
          type='number'
          name='qty'
          placeholder='0'
          required
        />
      </td>
      <td className='pr-1 py-1'>
        <input
          id={id}
          className='block appearance-none w-full bg-gray-200 border border-gray-200 pr-1 focus:ring-0 rounded leading-tight focus:outline-none focus:bg-white focus:border-primary-500 mr-2'
          type='number'
          min='0.01'
          step='0.01'
          name='price'
        />
      </td>
      <td className='flex items-center justify-center py-1'>
        <button
          className='rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600'
          onClick={deleteItemHandler}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
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
