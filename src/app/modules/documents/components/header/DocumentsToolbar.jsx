import { useState } from 'react';
import DocumentsFilter from './DocumentsFilter';
import CreateDocumentModal from '../modals/CreateDocumentModal';

const DocumentsToolbar = () => {

  const [show, setShow] = useState(false)

  const handleOpen = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
  }
  return (
    <>
    <div className='flex'>
      <DocumentsFilter />
      <button onClick={handleOpen} className='btn-primary mr-3'>
        Ajouter document
      </button>

    </div>

    <CreateDocumentModal show={show} onClose={handleClose} />
    </>
  );
};

export default DocumentsToolbar;
