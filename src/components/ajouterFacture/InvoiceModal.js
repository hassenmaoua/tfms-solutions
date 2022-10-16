import React, { Fragment } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import styles from './InvoiceModal.module.css';

function InvoiceModal({
  isOpen,
  setIsOpen,
  invoiceInfo,
  items,
  onAddNextInvoice,
}) {
  function closeModal() {
    setIsOpen(false);
  }

  const addNextInvoiceHandler = () => {
    setIsOpen(false);
    onAddNextInvoice();
  };

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
            const w = pageCanvas.width;
            const h = pageCanvas.height;
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
  if (isOpen)
    return (
      <>
        <div onClick={closeModal} className={styles.backdrop} />
        <div className={styles.container}>
          <div style={{ padding: '1rem' }} id='print'>
            <h1>FACTURE</h1>
            <div style={{ marginTop: '1.5rem' }}>
              <div className={styles.grid}>
                <span style={{ fontWeight: 700 }}>N° Facture:</span>
                <span>{invoiceInfo.invoiceNumber}</span>
                <span style={{ fontWeight: 700 }}>Cashier :</span>
                <span>{invoiceInfo.cashierName}</span>
                <span style={{ fontWeight: 700 }}>Client :</span>
                <span>{invoiceInfo.customerName}</span>
              </div>

              <table style={{ width: '100%' }}>
                <thead>
                  <tr className={styles.tr}>
                    <th style={{ width: '100%' }}>ARTICLE</th>
                    <th style={{ minWidth: 50, textAlign: 'center' }}>QNT</th>
                    <th style={{ minWidth: 80, textAlign: 'right' }}>
                      PRIX UNI
                    </th>
                    <th style={{ minWidth: 90, textAlign: 'right' }}>
                      MONTANT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td style={{ width: '100%' }}>{item.name}</td>
                      <td style={{ minWidth: 50, textAlign: 'center' }}>
                        {item.qty}
                      </td>
                      <td style={{ minWidth: 100, textAlign: 'right' }}>
                        {Number(item.price).toFixed(2)} TND
                      </td>
                      <td style={{ minWidth: 110, textAlign: 'right' }}>
                        {Number(item.price * item.qty).toFixed(2)} TND
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.details}>
                <div
                  style={{
                    paddingTop: '0.5rem',
                    borderTop: '1px solid #00000010',
                  }}
                >
                  <span style={{ fontWeight: 700 }}>Total HT :</span>
                  <span>{invoiceInfo.subtotal.toFixed(2)} TND</span>
                </div>
                <div>
                  <span style={{ fontWeight: 700 }}>Remise :</span>
                  <span>{invoiceInfo.discountRate.toFixed(2)} TND</span>
                </div>
                <div>
                  <span style={{ fontWeight: 700 }}>TVA :</span>
                  <span>{invoiceInfo.taxRate.toFixed(2)} TND</span>
                </div>
                <div
                  style={{
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    borderTopWidth: '1px',
                    borderTop: '1px solid #00000010',
                  }}
                >
                  <span style={{ fontWeight: 700 }}>Total TTC:</span>
                  <span style={{ fontWeight: 700 }}>
                    {invoiceInfo.total % 1 === 0
                      ? invoiceInfo.total
                      : invoiceInfo.total.toFixed(2)}{' '}
                    TND
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.actionContainer}>
            <button onClick={SaveAsPDFHandler}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                style={{ width: '1rem', height: '1rem' }}
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
            <button onClick={addNextInvoiceHandler}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                style={{ width: '1rem', height: '1rem' }}
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
      </>
    );
}

export default InvoiceModal;
