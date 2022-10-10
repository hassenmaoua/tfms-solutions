import styles from './NewProduitForm.module.css';
import Modal from '../ui/Modal';
import CurrencyFormat from 'react-currency-format';
import { useRef, useState, useEffect } from 'react';
import InputFormatter from '../ui/InputFormatter';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const timeUnite = ['Heure', 'Jour', 'Semaine', 'Mois', 'Trimestre', 'Anné'];

function NewProduitForm(props) {
  const axiosPrivate = useAxiosPrivate();

  const [clientList, setClientList] = useState({});
  const [typeActiviteList, setTypeActiviteList] = useState({});

  useEffect(() => {
    async function fetchClients() {
      try {
        const respone = await axiosPrivate.get('/client/list');

        let filteredList = respone?.data?.data.map(({ _id, intitule }) => ({
          _id,
          intitule,
        }));

        setClientList(filteredList);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchClients();

    async function fetchTypes() {
      try {
        const respone = await axiosPrivate.get('/etat/list/TPA');
        let filteredList = respone?.data?.data.map(({ _id, label }) => ({
          _id,
          label,
        }));
        setTypeActiviteList(filteredList);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchTypes();
  }, [axiosPrivate]);

  const maxLength = 35;
  const [count, setCount] = useState('0/' + maxLength);
  const [intitule, setIntitule] = useState('');
  function intituleHandler(e) {
    setIntitule(
      e.target.value.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      )
    );
    setCount(e.target.value.length + '/' + maxLength);
  }

  const [bugetVente, setBugetVente] = useState('');

  const clientInputRef = useRef();
  const typeInputRef = useRef();
  const quantiteInputRef = useRef();
  const tempInputRef = useRef();
  const unitInputRef = useRef();

  const onSubmit = props.onSubmit;

  function submitHandler(event) {
    const client_id = clientInputRef.current.value;
    const type_id = typeInputRef.current.value;
    const quantite = quantiteInputRef.current.value;
    const temp = tempInputRef.current.value;
    const unit = unitInputRef.current.value;

    const data = {
      intitule: intitule,
      typeActivite: type_id,
      quantite: quantite,
      bugetVente: bugetVente,
      tempsEstime: { temps: temp, unit: unit },
      client: client_id,
    };

    onSubmit(event, data);
  }

  return (
    <Modal
      height='350px'
      width='400px'
      onSubmit={submitHandler}
      title='Ajouter nouveau Produit'
      onClose={props.onClose}
    >
      <div>
        <div className={styles.row}>
          <InputFormatter width='100%' hint={count} label='Intitulé'>
            <input
              required
              autoFocus
              type='text'
              maxLength={maxLength}
              onChange={intituleHandler}
              value={intitule}
            />
          </InputFormatter>
        </div>
        <div className={styles.row}>
          <div style={{ width: '60%' }}>
            <InputFormatter hint='*Obligatoire' width='95%' label='Client'>
              <select className={styles.select} ref={clientInputRef}>
                <option value='' defaultValue>
                  Aucun client
                </option>
                {clientList.length
                  ? clientList.map((item, index) => {
                      return (
                        <option key={index} value={item._id}>
                          {item.intitule}
                        </option>
                      );
                    })
                  : ''}
              </select>
            </InputFormatter>
          </div>
          <div style={{ width: '40%' }}>
            <InputFormatter width='100%' hint=' ' label='Buget Vente'>
              <CurrencyFormat
                thousandSeparator=' '
                maxLength={14}
                suffix=' TND'
                style={{ textAlign: 'right' }}
                placeholder='0 TND'
                onValueChange={(values) => {
                  setBugetVente(values.formattedValue);
                }}
              />
            </InputFormatter>
          </div>
        </div>
        <div className={styles.row}>
          <InputFormatter
            width='100%'
            hint='*Obligatoire'
            label="Type d'activité"
          >
            <select className={styles.select} required ref={typeInputRef}>
              <option value='' hidden defaultValue>
                Sélectionner un type
              </option>
              {typeActiviteList.length
                ? typeActiviteList.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>
                        {item.label}
                      </option>
                    );
                  })
                : ''}
            </select>
          </InputFormatter>
        </div>
        <div className={styles.row}>
          <div style={{ width: '25%' }}>
            <InputFormatter width='90%' label='Quantité'>
              <input
                type='number'
                min='1'
                max='100'
                style={{ textAlign: 'center' }}
                required
                ref={quantiteInputRef}
              />
            </InputFormatter>
          </div>
          <div style={{ width: '35%' }}>
            <InputFormatter width='93%' label='Temps Estimé'>
              <input
                type='number'
                min='1'
                max='60'
                style={{ textAlign: 'center' }}
                required
                ref={tempInputRef}
              />
            </InputFormatter>
          </div>
          <div style={{ width: '40%' }}>
            <InputFormatter width='100%' label='Unité du Temps'>
              <select className={styles.select} required ref={unitInputRef}>
                <option value='' hidden defaultValue>
                  Sélectionner unité
                </option>
                {timeUnite.map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </InputFormatter>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default NewProduitForm;
