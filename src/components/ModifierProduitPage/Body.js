import { useState, useEffect } from 'react';
import styles from './Body.module.css';
import { FaArrowRight, FaSave } from 'react-icons/fa';
import { RiCloseFill } from 'react-icons/ri';
import IconButton from '../buttons/IconButton';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { Input, DatePicker, Select, Button, Upload, InputNumber } from 'antd';
import './Antd.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const { Option } = Select;

const timeUnite = [
  { value: 'Heure' },
  { value: 'Jour' },
  { value: 'Semaine' },
  { value: 'Mois' },
  { value: 'Trimestre' },
  { value: 'Anné' },
];

function Body(props) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const params = useParams();

  const respone = props.respone;
  const data = respone.data;

  const [clientList, setClientList] = useState('');
  const [typeActiviteList, setTypeActiviteList] = useState('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    async function getClients() {
      try {
        const respone = await axiosPrivate.get('/client/list', {
          signal: controller.signal,
        });
        let filteredList = respone?.data?.data.map(({ _id, intitule }) => ({
          _id,
          intitule,
        }));

        let bool = filteredList.some((client) => {
          return client._id === data.client._id;
        });

        setClient(bool ? data.client._id : '');

        isMounted && setClientList(filteredList);
      } catch (err) {
        console.error(err.message);
      }
    }

    async function getTypes() {
      try {
        const respone = await axiosPrivate.get('/etat/list/TPA', {
          signal: controller.signal,
        });

        let filteredList = respone?.data?.data.map(({ _id, label }) => ({
          _id,
          label,
        }));

        isMounted && setTypeActiviteList(filteredList);
      } catch (err) {
        console.error(err.message);
      }
    }

    getClients();
    getTypes();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, data.client._id]);

  const maxLength = 35;
  const [intitule, setIntitule] = useState(data.intitule);
  function intituleHandler(e) {
    setIntitule(
      e.target.value.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      )
    );
  }

  const [dateCreation, setDateCreation] = useState(data.dateCreation);
  const onChangeDate = (date, dateString) => {
    setDateCreation(dateString);
  };

  const [tempsEstime, setTempsEstime] = useState(data.tempsEstime);
  const onUniteChange = (value) => {
    const prev = tempsEstime;
    setTempsEstime({ ...prev, unit: value });
  };
  const onTempsChange = (e) => {
    const prev = tempsEstime;
    setTempsEstime({ ...prev, temps: e.target.value });
  };

  const [typeActivite, setTypeActivite] = useState(data.typeActivite._id);
  const onTypeActiviteChange = (value) => {
    setTypeActivite(value);
  };

  const [client, setClient] = useState('');
  const onClientChange = (value) => {
    setClient(value);
  };

  const [bugetConsomme, setBugetConsomme] = useState(
    data.bugetConsomme.split(' TND')[0]
  );
  const onBugetConsommeChange = (value) => {
    setBugetConsomme(`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
  };

  const [bugetVente, setBugetVente] = useState(
    data.bugetVente.split(' TND')[0]
  );
  const onBugetVenteChange = (value) => {
    setBugetVente(`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
  };

  const [quantite, setQuantite] = useState(data.quantite);
  const onQuantiteChange = (value) => {
    setQuantite(value);
  };

  async function submitHandler(e) {
    e.preventDefault();

    const produit = {
      intitule,
      dateCreation,
      tempsEstime,
      typeActivite,
      client,
      bugetConsomme: bugetConsomme + ' TND',
      bugetVente: bugetVente + ' TND',
      quantite,
    };

    try {
      const response = await axiosPrivate.patch(
        `/produit/${params.id}`,
        produit
      );

      console.log(response.data.message);
      navigate(-1);
    } catch (err) {
      console.log(err.response?.data.message);
    }
  }

  if (clientList && typeActiviteList)
    return (
      <form
        className={styles.main}
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <span className={styles.intitule}>Modification</span>
            </div>
            <div>
              <FaArrowRight
                className={styles.icon}
                onClick={() => {
                  navigate(-1);
                }}
              />
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.left}>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Intitule : </div>
                <div className={styles.rowData}>
                  <Input
                    autoFocus
                    type='text'
                    maxLength={maxLength}
                    onChange={intituleHandler}
                    value={intitule}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Date Creation : </div>
                <div className={styles.rowData}>
                  <DatePicker
                    style={{
                      width: 180,
                    }}
                    defaultValue={moment(dateCreation, 'DD-MM-YYYY')}
                    format={'DD-MM-YYYY'}
                    onChange={onChangeDate}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Temps Estimé : </div>
                <div className={styles.rowData}>
                  <Input
                    type='number'
                    min={1}
                    max={60}
                    onChange={onTempsChange}
                    value={tempsEstime.temps}
                    style={{
                      width: 60,
                      marginRight: 10,
                    }}
                  />
                  <Select
                    style={{
                      width: 110,
                    }}
                    onChange={onUniteChange}
                    value={tempsEstime.unit}
                    options={timeUnite}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Type d'activité : </div>
                <div className={styles.rowData}>
                  <Select
                    style={{
                      width: 180,
                    }}
                    onChange={onTypeActiviteChange}
                    value={typeActivite}
                  >
                    {typeActiviteList.map((item, index) => {
                      return (
                        <Option key={index} value={item._id}>
                          {item.label}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Dessin Détaillé : </div>
                <div className={styles.rowData}>
                  <Upload listType='picture' disabled>
                    <Button
                      style={{
                        width: 180,
                      }}
                      icon={<UploadOutlined />}
                    >
                      Choisir un fichier
                    </Button>
                  </Upload>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Client : </div>
                <div className={styles.rowData}>
                  <Select
                    style={{
                      width: 200,
                    }}
                    showSearch
                    placeholder='Choisir un client'
                    optionFilterProp='children'
                    value={client}
                    onChange={onClientChange}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    <Option value={''}>Aucun Client</Option>
                    {clientList.map((item, index) => {
                      return (
                        <Option key={index} value={item._id}>
                          {item.intitule}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Buget Consomme : </div>
                <div className={styles.rowData}>
                  <InputNumber
                    min={0}
                    max={9999999}
                    value={bugetConsomme}
                    addonAfter='TND'
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                    }
                    onChange={onBugetConsommeChange}
                    style={{ width: 200 }}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Buget Vente : </div>
                <div className={styles.rowData}>
                  <InputNumber
                    min={0}
                    max={9999999}
                    value={bugetVente}
                    addonAfter='TND'
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                    }
                    onChange={onBugetVenteChange}
                    style={{ width: 200 }}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Quantité :</div>
                <div className={styles.rowData}>
                  <InputNumber
                    style={{
                      width: 100,
                      marginRight: 100,
                    }}
                    min={1}
                    max={100}
                    value={quantite}
                    onChange={onQuantiteChange}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Facture :</div>
                <div className={styles.rowData}>
                  <Upload listType='picture' disabled>
                    <Button
                      style={{
                        width: 180,
                        marginRight: 20,
                      }}
                      icon={<UploadOutlined />}
                    >
                      Choisir un fichier
                    </Button>
                  </Upload>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <IconButton color='#5BC0DE' icon={FaSave}>
            Enregistrer
          </IconButton>
          <IconButton
            color='#BB2124'
            icon={RiCloseFill}
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Annuler
          </IconButton>
        </div>
      </form>
    );
  else
    return (
      <>
        <Spinner />
      </>
    );
}

export default Body;
