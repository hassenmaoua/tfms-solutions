import styles from './InvoiceForm.module.css';
import { uid } from 'uid';
import FactureItem from './FactureItem';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';

function Facture({ client, intitule, dopiece, dateDoc, tax, setDocument }) {
  const axiosPrivate = useAxiosPrivate();

  const [livraisonList, setLivraisonList] = useState('');
  const id = client?._id;

  useEffect(() => {
    async function fetchDoucments() {
      try {
        const respone = await axiosPrivate.get(
          `/document/list-by-client/${id}`
        );
        setLivraisonList(respone?.data?.data);
      } catch (err) {
        console.error(err.message);
        setLivraisonList('');
      }
    }

    fetchDoucments();
  }, [axiosPrivate, id]);

  const [TVA, setTVA] = useState('');
  const [HT, setHT] = useState('');
  const [timber, setTimber] = useState(0);
  const [TTC, setTTC] = useState('');
  const [articles, setArticles] = useState('');

  const [items, setItems] = useState([
    {
      id: uid(6),
      dopiece: '',
      montantHT: 0,
      articles: '',
    },
  ]);

  const addItemHandler = (e) => {
    e.preventDefault();
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        dopiece: '',
        montantHT: 0,
        articles: '',
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const setItemHandler = (id, document) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.dopiece = document.dopiece;
        item.montantHT = document.montantHT;
        item.articles = document.articles;
      }

      return item;
    });

    setItems(newItems);
  };
  let subtotal = 0;
  try {
    let result = 0;
    if (items[0].dopiece) {
      result = items.flatMap(({ articles }) => articles);
    } else {
      result = 0;
    }

    console.log(result);
    subtotal = articles.reduce((prev, curr) => {
      if (curr.intitule.trim().length > 0)
        return prev + Number(curr.bugetVente * Math.floor(curr.quantite));
      else return prev;
    }, 0);
  } catch (err) {
    console.log(err.message);
    console.log(articles);
  }

  const taxRate = (tax * subtotal) / 100;
  const total = subtotal + Number(timber) + taxRate;

  useEffect(() => {
    intitule === 'facture' ? setTimber('0.600') : setTimber(0);
    setTVA(taxRate);
    setHT(subtotal.toFixed(2));
    setTTC(total.toFixed(2));

    setDocument({
      intitule,
      dopiece,
      dateDoc,
      articles: items,
      montantHT: HT,
      montantTVA: TVA,
      TVA: tax,
      timber: timber,
      montantTTC: TTC,
      client,
    });
  }, [
    intitule,
    dopiece,
    dateDoc,
    items,
    HT,
    TVA,
    tax,
    timber,
    TTC,
    client,
    subtotal,
    taxRate,
    total,
    intitule,
  ]);

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: '60%' }}>N° du Livraison</th>
            <th style={{ width: '30%', textAlign: 'center', minWidth: 120 }}>
              Montant HT
            </th>

            <th style={{ width: '10%', textAlign: 'center', minWidth: 60 }}>
              Action
            </th>
          </tr>
        </thead>
        {livraisonList ? (
          <tbody>
            {client ? (
              items.map((item, index) => (
                <FactureItem
                  key={index}
                  livraisonList={livraisonList}
                  document={item}
                  onDeleteItem={deleteItemHandler}
                  onSetItem={setItemHandler}
                />
              ))
            ) : (
              <tr>
                <td>Selectionner un client</td>
              </tr>
            )}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td>
                <span>Aucun Produit Trouve</span>
              </td>
            </tr>
          </tbody>
        )}
      </table>
      <button
        disabled={!livraisonList}
        className={styles.addButton}
        onClick={(e) => addItemHandler(e)}
      >
        Ajouter Bon de Livraison
      </button>
    </div>
  );
}

export default Facture;
