import styles from './InvoiceForm.module.css';
import { uid } from 'uid';
import LivraisonItem from './LivraisonItem';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';

function Livraison({ client, intitule, dopiece, dateDoc, tax, setDocument }) {
  const axiosPrivate = useAxiosPrivate();

  const [articleList, setArticleList] = useState('');
  const id = client?._id;

  useEffect(() => {
    async function fetchArticles() {
      try {
        const respone = await axiosPrivate.get(`/produit/list-by-client/${id}`);

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
        setArticleList('');
      }
    }

    fetchArticles();
  }, [axiosPrivate, id]);

  const [TVA, setTVA] = useState('');
  const [HT, setHT] = useState('');
  const [timber, setTimber] = useState(0);
  const [TTC, setTTC] = useState('');
  const [items, setItems] = useState([
    {
      id: uid(6),
      intitule: '',
      quantite: 1,
      bugetVente: '1.00',
    },
  ]);

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
            <th style={{ width: '58%' }}>Designation</th>
            <th style={{ width: '12%', minWidth: 80 }}>Qté</th>
            <th style={{ width: '20%', textAlign: 'center', minWidth: 120 }}>
              Prix Unitaire
            </th>
            <th style={{ width: '10%', textAlign: 'center', minWidth: 60 }}>
              Action
            </th>
          </tr>
        </thead>
        {articleList ? (
          <tbody>
            {client ? (
              items.map((item, index) => (
                <LivraisonItem
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
        disabled={!articleList}
        className={styles.addButton}
        onClick={(e) => addItemHandler(e)}
      >
        Ajouter Article
      </button>
    </div>
  );
}

export default Livraison;
