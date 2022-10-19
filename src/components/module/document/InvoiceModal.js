import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import styles from './InvoiceModal.module.css';
import LOGO from '../../assets/images/logo.png';
import FrenchNumbersToWords from 'french-numbers-to-words';

function InvoiceModal(props) {
  const setIsOpen = props.setIsOpen;
  const isOpen = props.isOpen;
  const documentDetails = props.document;

  var wordsTTC = '';

  if (documentDetails.montantTTC % 1 === 0) {
    const number = new FrenchNumbersToWords(documentDetails.montantTTC, 'fr')
      .result;
    wordsTTC = `${number.fullText} Dinar Tunisienne`;
  } else {
    const number = new FrenchNumbersToWords(documentDetails.montantTTC, 'fr')
      .result;
    const n = Number(documentDetails.montantTTC % 1).toFixed(2) * 100;
    const centieme = new FrenchNumbersToWords(n, 'fr').result;
    wordsTTC = `${number.fullText} Dinar Tunisienne et ${centieme.fullText} Centième Millime`;
  }

  function closeModal() {
    setIsOpen(false);
  }

  const addNextInvoiceHandler = () => {
    setIsOpen(false);
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
          pdf.save(
            `${documentDetails.intitule} N°${documentDetails.dopiece}.pdf`
          );
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
            <div className={styles.header}>
              <div>
                <h2>
                  TOURNAGE & FRAISAGE <br /> MAOUA Salem
                </h2>
                <h4>Rue de l'indépendance M'Saken 4070</h4>
              </div>
              <img src={LOGO} alt='logo.png' className={styles.logo} />
            </div>
            <div>
              <h1>
                {documentDetails.intitule} N°{documentDetails.dopiece}
              </h1>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <div className={styles.informations}>
                <div className={styles.grid}>
                  <span style={{ fontWeight: 700, textAlign: 'right' }}>
                    Createur :
                  </span>
                  <span>{documentDetails.docCreateur.label}</span>
                  <span style={{ fontWeight: 700, textAlign: 'right' }}>
                    Code TVA :
                  </span>
                  <span>{documentDetails.docCreateur.identifiantFiscal}</span>
                  <span style={{ fontWeight: 700, textAlign: 'right' }}>
                    Date :
                  </span>
                  <span>{documentDetails.dateDoc}</span>
                </div>
                <div className={styles.grid}>
                  <span style={{ fontWeight: 700, textAlign: 'right' }}>
                    A l'ordre de{' '}
                  </span>
                  <span>{documentDetails.client.intitule}</span>
                  <span style={{ fontWeight: 700, textAlign: 'right' }}>
                    Code TVA :
                  </span>
                  <span>{documentDetails.client.identifiantFiscal}</span>
                  <span style={{ fontWeight: 700, textAlign: 'right' }}>
                    Adresse :
                  </span>
                  <span>{documentDetails.client.adresse}</span>
                </div>
              </div>

              <table className={styles.table}>
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
                    <tr key={item._id}>
                      <td style={{ minWidth: 40, textAlign: 'left' }}>
                        {item.quantite}
                      </td>
                      <td style={{ width: '100%' }}>{item.intitule}</td>

                      <td style={{ minWidth: 90, textAlign: 'right' }}>
                        {Number(
                          item.bugetVente.split('TND')[0].replace(' ', '')
                        ).toFixed(2)}
                      </td>
                      <td style={{ minWidth: 100, textAlign: 'right' }}>
                        {(
                          Number(
                            item.bugetVente.split('TND')[0].replace(' ', '')
                          ) * item.quantite
                        ).toFixed(2)}
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
                  <span>{documentDetails.montantHT.toFixed(2)}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 700 }}>Remise :</span>
                  <span>{documentDetails.remise.toFixed(2)}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 700 }}>TVA :</span>
                  <span>{documentDetails.montantTVA.toFixed(2)}</span>
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
                    {documentDetails.montantTTC % 1 === 0
                      ? documentDetails.montantTTC
                      : documentDetails.montantTTC.toFixed(2)}{' '}
                    TND
                  </span>
                </div>
                <div
                  style={{
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    borderTopWidth: '1px',
                    color: '#AAAAAA',
                    borderTop: '1px solid #00000010',
                  }}
                >
                  <span>{wordsTTC}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.actionContainer}>
            <button onClick={SaveAsPDFHandler}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                style={{ width: '1rem', height: '1rem', marginRight: '5px' }}
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
                style={{ width: '1rem', height: '1rem', marginRight: '5px' }}
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
