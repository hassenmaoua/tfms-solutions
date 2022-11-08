import React, { useState, useEffect } from 'react';
import { uid } from 'uid';
import { useNavigate } from 'react-router-dom';
import Livraison from './Livraison';
import Facture from './Facture';
import styles from './InvoiceForm.module.css';
import Spinner from '../../../layout/Spinner';
import { Select, InputNumber } from 'antd';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';

const { Option } = Select;

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

function DocumentForm(props) {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const clientList = props.clientList;

  const [document, setDocument] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [intitule, setIntitule] = useState('bon de livraison');
  const [client, setClient] = useState(null);
  const [documentNumber, setDocumentNumber] = useState(1);
  const [tax, setTax] = useState('19');
  const [timber, setTimber] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (clientList[client] && document) {
      try {
        setIsLoading(true);
        const respone = await axiosPrivate.post('/document', document);
        console.log(respone?.data);
        navigate(-1);
      } catch (err) {
        console.log(err.respone);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (clientList)
    return (
      <form className={styles.form} onSubmit={submitHandler}>
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
              <label style={{ fontWeight: 700 }} htmlFor='documentNumber'>
                N° Document :
              </label>
              <InputNumber
                required
                style={{ maxWidth: 100 }}
                name='documentNumber'
                id='documentNumber'
                min='1'
                step='1'
                value={documentNumber}
                onChange={(value) => setDocumentNumber(value)}
              />
            </div>
          </div>
          <div style={{ textAlign: 'center', fontSize: 25 }}>
            <Select
              style={{
                width: 200,
                fontSize: 20,
                fontWeight: 700,
              }}
              placeholder='Type de document'
              value={intitule}
              onChange={(value) => {
                setIntitule(value);
              }}
            >
              <Option value='bon de livraison'>Bon de Livraison</Option>
              <Option value='facture'>Facture</Option>
            </Select>
          </div>

          <div className={styles.coordonner}>
            <label htmlFor='client'>Client</label>
            <Select
              style={{
                width: 260,
              }}
              showSearch
              placeholder='Choisir un client'
              optionFilterProp='children'
              value={client}
              onChange={(value) => {
                setClient(value);
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {clientList.length ? (
                clientList.map((item, index) => {
                  return (
                    <Option key={index} value={index}>
                      {item.intitule}
                    </Option>
                  );
                })
              ) : (
                <Option value=''>Aucun Client</Option>
              )}
            </Select>
          </div>

          {intitule !== 'facture' ? (
            <Livraison
              client={clientList[client]}
              intitule={intitule}
              dopiece={documentNumber}
              dateDoc={today}
              document={document}
              tax={tax}
              setDocument={setDocument}
            />
          ) : (
            <Facture
              client={clientList[client]}
              intitule={intitule}
              dopiece={documentNumber}
              dateDoc={today}
              document={document}
              tax={tax}
              setDocument={setDocument}
            />
          )}
          {document && (
            <div className={styles.details}>
              <div>
                <span style={{ fontWeight: 700 }}>Total HT :</span>
                <span>
                  {Number(document.montantHT)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                  TND
                </span>
              </div>
              {intitule === 'facture' && (
                <div>
                  <span style={{ fontWeight: 700 }}>Timber :</span>
                  <span>{Number(document.timber).toFixed(3)} TND</span>
                </div>
              )}

              <div>
                <span style={{ fontWeight: 700 }}>TVA :</span>
                <span>({tax || '0'}%) </span>
              </div>
              <div
                style={{ paddingTop: '0.5rem', borderTop: '1px solid #CCC' }}
              >
                <span style={{ fontWeight: 700 }}>Total TTC:</span>
                <span style={{ fontWeight: 700 }}>
                  {document.montantTTC % 1 === 0
                    ? document.montantTTC
                    : Number(document.montantTTC)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                  TND
                </span>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className={styles.buttonContainer}>
            <button
              disabled={!clientList[client]}
              className={styles.button}
              type='submit'
            >
              Validate
            </button>

            <button
              style={{ marginTop: '0.5rem' }}
              className={styles.cancel}
              type='reset'
              onClick={() => {
                navigate(-1);
              }}
            >
              Annuler
            </button>
            <div className={styles.variables}>
              <div>
                <label htmlFor='tax'>Taux de TVA :</label>

                <InputNumber
                  name='tax'
                  id='tax'
                  min='0'
                  step='1'
                  placeholder='0'
                  addonAfter='%'
                  value={tax}
                  onChange={(value) => setTax(value)}
                />
              </div>

              {intitule === 'facture' ? (
                <div>
                  <label htmlFor='timber'>Timber :</label>

                  <InputNumber
                    name='timber'
                    id='timber'
                    min='0'
                    step='0.1'
                    placeholder='0.000'
                    addonAfter='TND'
                    value={timber}
                    onChange={(value) => setTimber(value)}
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        {isLoading && <Spinner />}
      </form>
    );
  else return <Spinner />;
}

export default DocumentForm;
