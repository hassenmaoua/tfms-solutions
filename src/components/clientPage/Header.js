import styles from './Header.module.css';
import IconButton from '../buttons/IconButton';
import SearchQuery from '../inputs/SearchQuery';
import { IoIosAddCircle } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

import { useState } from 'react';

function Header(props) {
  const [state, setState] = useState('tout');

  function onStateChanged(event) {
    setState(event.currentTarget.value);
  }

  return (
    <div className={styles.container}>
      <div>
        <SearchQuery placeholder={'Rechercher un Client'} icon={FaSearch} />
      </div>
      <div>
        <div className={styles.radio}>
          <input
            type='radio'
            name='type'
            value='tout'
            checked={state === 'tout'}
            onChange={onStateChanged}
          />{' '}
          Tout
          <input
            type='radio'
            value='individuelle'
            name='type'
            checked={state === 'individuelle'}
            onChange={onStateChanged}
          />{' '}
          Individuelle
          <input
            type='radio'
            value='societé'
            name='type'
            checked={state === 'societé'}
            onChange={onStateChanged}
          />{' '}
          Societé
        </div>
      </div>
      <div>
        <IconButton
          icon={IoIosAddCircle}
          onClick={props.onButtonClick}
          color='#213502'
        >
          Ajouter Client
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
