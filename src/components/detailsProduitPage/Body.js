import React from 'react';
import styles from './Body.module.css';
import { FaArrowRight } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import IconButton from '../buttons/IconButton';
import SelectEtat from './SelectEtat';
import { useNavigate } from 'react-router-dom';
import State from '../ui/State';
import Description from './Description';

const responsable = 'https://lwm-api.herokuapp.com/public/profile_picture.jpg';

function Body(props) {
  const navigate = useNavigate();

  const deleteHandler = props.onDelete;
  const editHandler = props.onEdit;
  const response = props.response;
  const data = response.data;

  if (response.status)
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div style={{ display: 'flex' }}>
              <span className={styles.intitule}>{data.intitule}</span>
              <SelectEtat etat={data.etat} id={data._id} />
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
                <div className={styles.rowHeader}>Date Creation : </div>
                <div className={styles.rowData}>{data.dateCreation}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Temps Estimé : </div>
                <div className={styles.rowData}>
                  {data.tempsEstime.temps} {data.tempsEstime.unit}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Type d'activité : </div>
                <div className={styles.rowData}>
                  <State element={data.typeActivite} />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Dessin Détaillé : </div>
                <div className={styles.rowData}>Aucun Fichier</div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Description :</div>
              </div>
              <div className={styles.row}>
                <Description defaultValue={data.description} />
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Client : </div>
                <div className={styles.client}>
                  <img src={data.client.photo} alt={''} />
                  <span>
                    {data.client.intitule
                      ? data.client.intitule
                      : 'Aucun Client'}
                  </span>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Responsable : </div>
                <div className={styles.responsable}>
                  <img src={responsable} alt='Responsable' />
                  <span>{data.responsable.label}</span>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Buget Consomme : </div>
                <div className={styles.rowData}>{data.bugetConsomme}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Buget Vente : </div>
                <div className={styles.rowData}>{data.bugetVente}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Quantité :</div>
                <div className={styles.rowData}>{data.quantite}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowHeader}>Facture :</div>
                <div className={styles.rowData}>Aucune Facture</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <IconButton
            color='#5BC0DE'
            icon={FiEdit}
            onClick={() => {
              editHandler();
            }}
          >
            Modifier
          </IconButton>
          <IconButton
            color='#BB2124'
            icon={MdDeleteForever}
            onClick={() => {
              deleteHandler();
            }}
          >
            Supprimer
          </IconButton>
        </div>
      </div>
    );
  else return <h1>{response.message}</h1>;
}

export default Body;
