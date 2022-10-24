import styles from './Header.module.css';
import { IoIosAddCircle } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import IconButton from '../../ui/buttons/IconButton';
import SearchQuery from '../../ui/inputs/SearchQuery';

function Header(props) {
  const intitule = props.filter;
  const onIntituleChanged = props.onFilter;

  return (
    <div className={styles.container}>
      <div>
        <SearchQuery placeholder={'Rechercher un Document'} icon={FaSearch} />
      </div>
      <div>
        <div className={styles.radio}>
          <input
            type='radio'
            name='type'
            value='tout'
            checked={intitule === 'tout'}
            onChange={onIntituleChanged}
          />{' '}
          Tout
          <input
            type='radio'
            value='Bon de Livraison'
            name='type'
            checked={intitule.toLocaleLowerCase() === 'bon de livraison'}
            onChange={onIntituleChanged}
          />{' '}
          Bon de Livraison
          <input
            type='radio'
            value='Facture'
            name='type'
            checked={intitule.toLocaleLowerCase() === 'facture'}
            onChange={onIntituleChanged}
          />{' '}
          Facture
        </div>
      </div>
      <div>
        <IconButton
          icon={IoIosAddCircle}
          onClick={props.onButtonClick}
          color='#213502'
        >
          Ajouter Document
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
