import styles from './Header.module.css';
import { IoIosAddCircle } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import IconButton from '../../ui/buttons/IconButton';
import SearchQuery from '../../ui/inputs/SearchQuery';

function Header(props) {
  const [state, setState] = useState('tout');

  function onStateChanged(event) {
    setState(event.currentTarget.value);
  }

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
            checked={state === 'tout'}
            onChange={onStateChanged}
          />{' '}
          Tout
          <input
            type='radio'
            value='nouveau'
            name='type'
            checked={state === 'nouveau'}
            onChange={onStateChanged}
          />{' '}
          Nouveau
          <input
            type='radio'
            value='validé'
            name='type'
            checked={state === 'validé'}
            onChange={onStateChanged}
          />{' '}
          Validé
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
