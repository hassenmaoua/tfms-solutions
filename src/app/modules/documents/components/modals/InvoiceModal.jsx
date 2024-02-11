import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { toAbsoluteUrl } from '../../../../../assets/helpers';

const InvoiceModal = ({
  isOpen,
  setIsOpen,
  invoiceInfo,
  items,
  onAddNextInvoice,
}) => {
  function closeModal() {
    setIsOpen(false);
  }

  const addNextInvoiceHandler = () => {
    setIsOpen(false);
    onAddNextInvoice();
  };

  const documentDetails = {
    client: { _id: 4, intitule: 'Mohsen', identifiantFiscal: 'xxx345' },
    dateDoc: '12/5/2018',
    articles: [],
    montantHT: 4561,
    timber: 0.04,
    TVA: 45,
    montantTTC: 4414,
  };

  const wordsTTC = 'test test test';

  const SaveAsPDFHandler = () => {
    const dom = document.getElementById('print');
    toPng(dom)
      .then((dataUrl) => {
        const img = new Image();
        img.crossOrigin = 'annoymous';
        img.src = dataUrl;
        img.onload = () => {
          // Initialize the PDF.
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'in',
            format: [5.5, 8.5],
          });

          // Define reused data
          const imgProps = pdf.getImageProperties(img);
          const imageType = imgProps.fileType;
          const pdfWidth = pdf.internal.pageSize.getWidth();

          // Calculate the number of pages.
          const pxFullHeight = imgProps.height;
          const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
          const nPages = Math.ceil(pxFullHeight / pxPageHeight);

          // Define pageHeight separately so it can be trimmed on the final page.
          let pageHeight = pdf.internal.pageSize.getHeight();

          // Create a one-page canvas to split up the full image.
          const pageCanvas = document.createElement('canvas');
          const pageCtx = pageCanvas.getContext('2d');
          pageCanvas.width = imgProps.width;
          pageCanvas.height = pxPageHeight;

          for (let page = 0; page < nPages; page++) {
            // Trim the final page to reduce file size.
            if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
              pageCanvas.height = pxFullHeight % pxPageHeight;
              pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
            }
            // Display the page.
            const w = pageCanvas.width * 2;
            const h = pageCanvas.height * 2;
            pageCtx.fillStyle = 'white';
            pageCtx.fillRect(0, 0, w, h);
            pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

            // Add the page to the PDF.
            if (page) pdf.addPage();

            const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
            pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
          }
          // Output / Save
          pdf.save(`invoice-${invoiceInfo.invoiceNumber}.pdf`);
        };
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-50 overflow-y-auto'
        onClose={closeModal}
      >
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-black/50' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='my-8 inline-block w-full max-w-xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all'>
              <div className='p-4' id='print'>
                <div className='flex justify-between items-center'>
                  <div>
                    <h2 className='text-gray-700 text-xl leading-7 font-bold text-center'>
                      TOURNAGE & FRAISAGE <br /> MAOUA Salem
                    </h2>
                    <h4 className='m-0'>Rue de l'indépendance M'Saken 4070</h4>
                    <h4 className='flex justify-center'>
                      <span>Code TVA :</span>
                      <span className='font-bold ml-1'>
                        {/* {documentDetails.docCreateur.identifiantFiscal} */}
                        XXXXX-XXX-XXXX
                      </span>
                    </h4>
                  </div>
                  <img
                    src={toAbsoluteUrl('/media/logos/logo.png')}
                    alt='logo.png'
                    className='h-32 m-3'
                  />
                </div>
                <h1 className='mt-5 mb-0 h-full w-full text-2xl font-bold text-center text-gray-900 capitalize'>
                  {/* {documentDetails.intitule} N°{documentDetails.dopiece} */}
                  FACTURE N°4154
                </h1>
                <div className='mt-6'>
                  <div className='flex justify-between'>
                    <div className='flex flex-col w-fit h-full mb-4'>
                      <div>
                        <span className='font-bold text-left'>
                          Code Client :
                        </span>
                        <span>{documentDetails.client._id}</span>
                      </div>
                      <div>
                        <span className='font-bold text-left'>
                          Nom Client :
                        </span>
                        <span>{documentDetails.client.intitule}</span>
                      </div>
                      <div>
                        <span className='font-bold text-left'>Code TVA :</span>
                        <span>{documentDetails.client.identifiantFiscal}</span>
                      </div>
                    </div>

                    <div className='flex flex-col w-fit h-full mb-4'>
                      <div>
                        <span className='font-bold text-left w-fit mr-1 mb-1'>
                          Date :
                        </span>
                        <span>{documentDetails.dateDoc}</span>
                      </div>
                      <div>
                        <span className='font-bold text-left'>Adresse :</span>
                        <span>{documentDetails.client.adresse}</span>
                      </div>
                    </div>
                  </div>

                  <table className='w-full mt-5 text-sm leading-5'>
                    <thead>
                      <tr>
                        <th style={{ minWidth: 40, textAlign: 'left' }}>Qté</th>
                        <th style={{ width: '100%' }}>Designation</th>

                        <th style={{ minWidth: 90, textAlign: 'right' }}>
                          Prix Unitaire
                        </th>
                        <th style={{ minWidth: 100, textAlign: 'right' }}>
                          Montant HT
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {documentDetails.articles.map((item) => (
                        <tr key={item.id}>
                          <td style={{ minWidth: 40, textAlign: 'left' }}>
                            {item.quantite}
                          </td>
                          <td style={{ width: '100%' }}>{item.intitule}</td>

                          <td style={{ minWidth: 90, textAlign: 'right' }}>
                            {Number(item.bugetVente)
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                          </td>
                          <td style={{ minWidth: 100, textAlign: 'right' }}>
                            {(Number(item.bugetVente) * item.quantite)
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className='flex flex-col items-end mt-4'>
                    <div className='flex justify-between w-full pt-2 border-t border-black border-opacity-60'>
                      <span className='font-bold'>Total HT :</span>
                      <span>
                        {documentDetails.montantHT
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                      </span>
                    </div>
                    <div className='flex justify-between w-full'>
                      <span className='font-bold'>Timber :</span>
                      <span>{Number(documentDetails.timber).toFixed(3)}</span>
                    </div>
                    <div className='flex justify-between w-full mb-2'>
                      <span className='font-bold'>TVA :</span>
                      <span>{documentDetails.TVA}%</span>
                    </div>
                    <div className='flex justify-between w-full py-2 border-t border-black border-opacity-60'>
                      <span className='font-bold'>Total TTC :</span>
                      <span className='font-bold'>
                        {documentDetails.montantTTC % 1 === 0
                          ? documentDetails.montantTTC
                          : documentDetails.montantTTC
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                        TND
                      </span>
                    </div>
                    <div
                      style={{
                        paddingTop: '0.5rem',
                        paddingBottom: '0.5rem',
                        borderTopWidth: '1px',
                        color: '#808080',
                        borderTop: '1px solid #00000060',
                      }}
                    >
                      <span>{wordsTTC}</span>
                    </div>
                    <div>
                      <div className='mt-8 w-36 h-20 border border-black border-opacity-80 rounded-5'>
                        <span>Signature</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-4 flex space-x-2 px-4 pb-6'>
                <button
                  className='flex w-full items-center justify-center space-x-1 rounded-md border border-primary-600 py-2 text-sm text-primary-600 shadow-sm hover:bg-primary-600 hover:text-white'
                  onClick={SaveAsPDFHandler}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                    />
                  </svg>
                  <span>Download</span>
                </button>
                <button
                  onClick={addNextInvoiceHandler}
                  className='flex w-full items-center justify-center space-x-1 rounded-md bg-primary-600 py-2 text-sm text-white shadow-sm hover:bg-primary-700'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 5l7 7-7 7M5 5l7 7-7 7'
                    />
                  </svg>
                  <span>Next</span>
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InvoiceModal;
