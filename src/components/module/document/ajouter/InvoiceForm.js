import React, { useState, useEffect } from 'react';
import { uid } from 'uid';
import { useNavigate } from 'react-router-dom';
import InvoiceItem from './InvoiceItem';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import styles from './InvoiceForm.module.css';
import Spinner from '../../../layout/Spinner';
import { Select, InputNumber } from 'antd';

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

function InvoiceForm() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [clientList, setClientList] = useState('');
  const [articleList, setArticleList] = useState('');

  useEffect(() => {
    async function fetchClients() {
      try {
        const respone = await axiosPrivate.get('/client/list');

        let filteredList = respone?.data?.data.map(
          ({ _id, intitule, identifiantFiscal, adresse }) => ({
            _id,
            intitule,
            identifiantFiscal,
            adresse,
          })
        );

        setClientList(filteredList);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchClients();

    async function fetchArticles() {
      try {
        const respone = await axiosPrivate.get(`/produit/list`);

        let filteredList = respone?.data?.data.map(
          ({ _id, intitule, quantite, bugetVente }) => {
            const newBugetVente = Number(
              bugetVente.split(' TND')[0].replace(' ', '')
            );
            return {
              _id,
              intitule,
              quantite,
              bugetVente: newBugetVente,
            };
          }
        );
        if (respone.status === 200) setArticleList(filteredList);
        else setArticleList('');
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchArticles();
  }, [axiosPrivate]);

  const [timber, setTimber] = useState('0.600');
  const [tax, setTax] = useState('19');
  const [TVA, setTVA] = useState('');
  const [TTC, setTTC] = useState('');
  const [HT, setHT] = useState('');
  const [documentNumber, setDocumentNumber] = useState(1);
  const [client, setClient] = useState(null);
  const [items, setItems] = useState([
    {
      id: uid(6),
      intitule: '',
      quantite: 1,
      bugetVente: '1.00',
    },
  ]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (client) {
      const document = {
        intitule: 'Bon de Livraison',
        dopiece: documentNumber,
        dateDoc: today,
        articles: items,
        montantHT: HT,
        montantTVA: TVA,
        TVA: tax,
        timber: timber,
        montantTTC: TTC,
        client: clientList[client],
      };

      try {
        const respone = await axiosPrivate.post('/document', document);
        console.log(respone?.data);
        navigate(-1);
      } catch (err) {
        console.log(err.respone);
      }
    }
  };

  const addItemHandler = (e) => {
    e.preventDefault();
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        intitule: '',
        quantite: 1,
        bugetVente: '1.00',
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const editQuantiteHandler = (value, id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.quantite = value;
      }

      return item;
    });

    setItems(newItems);
  };

  const editPrixHandler = (value, id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.bugetVente = value;
      }

      return item;
    });

    setItems(newItems);
  };

  const setItemHandler = (id, article) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.intitule = article.intitule;
        item.quantite = article.quantite;
        item.bugetVente = article.bugetVente;
      }

      return item;
    });

    setItems(newItems);
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.intitule.trim().length > 0)
      return prev + Number(curr.bugetVente * Math.floor(curr.quantite));
    else return prev;
  }, 0);
  const taxRate = (tax * subtotal) / 100;
  const total = subtotal + Number(timber) + taxRate;

  useEffect(() => {
    setTVA(taxRate);
    setHT(subtotal.toFixed(2));
    setTTC(total.toFixed(2));
  }, [subtotal, taxRate, total]);
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
          <h1 style={{ fontSize: '1.7rem' }}>Bon de Livraison</h1>
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
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '58%' }}>Designation</th>
                <th style={{ width: '12%', minWidth: 80 }}>Qté</th>
                <th
                  style={{ width: '20%', textAlign: 'center', minWidth: 120 }}
                >
                  Prix Unitaire
                </th>
                <th style={{ width: '10%', textAlign: 'center', minWidth: 60 }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {client ? (
                items.map((item, index) => (
                  <InvoiceItem
                    key={index}
                    produitList={articleList}
                    article={item}
                    onDeleteItem={deleteItemHandler}
                    onEditQuantiteHandler={editQuantiteHandler}
                    onEditPrixHandler={editPrixHandler}
                    onSetItem={setItemHandler}
                  />
                ))
              ) : (
                <tr>
                  <td>Selectionner un client</td>
                </tr>
              )}
            </tbody>
          </table>
          <button
            disabled={!client}
            className={styles.addButton}
            onClick={(e) => addItemHandler(e)}
          >
            Ajouter Article
          </button>
          <div className={styles.details}>
            <div>
              <span style={{ fontWeight: 700 }}>Total HT :</span>
              <span>
                {Number(subtotal)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                TND
              </span>
            </div>
            <div>
              <span style={{ fontWeight: 700 }}>Timber :</span>
              <span>{Number(timber).toFixed(3)} TND</span>
            </div>
            <div>
              <span style={{ fontWeight: 700 }}>TVA :</span>
              <span>
                ({tax || '0'}%){' '}
                {taxRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} TND
              </span>
            </div>
            <div style={{ paddingTop: '0.5rem', borderTop: '1px solid #CCC' }}>
              <span style={{ fontWeight: 700 }}>Total TTC:</span>
              <span style={{ fontWeight: 700 }}>
                {total % 1 === 0
                  ? total
                  : Number(total)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                TND
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.buttonContainer}>
            <button disabled={!client} className={styles.button} type='submit'>
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
            </div>
          </div>
        </div>
      </form>
    );
  else return <Spinner />;
}

export default InvoiceForm;
