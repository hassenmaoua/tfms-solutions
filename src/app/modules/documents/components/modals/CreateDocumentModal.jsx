import React from 'react';
import Modal from '../../../../../assets/helpers/components/Modal';
import { Dialog } from '@headlessui/react';
import InvoiceForm from './InvoiceForm';

const CreateDocumentModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <Dialog.Panel className='bg-white relative shadow rounded-lg w-fit h-fit mx-auto transition-all dark:bg-gray-800'>
        <div className='px-6 py-12'>
          <InvoiceForm />
        </div>
      </Dialog.Panel>
    </Modal>
  );
};

export default CreateDocumentModal;
