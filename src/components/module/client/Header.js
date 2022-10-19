import styles from './Header.module.css';
import { IoIosAddCircle } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import IconButton from '../../ui/buttons/IconButton';
import SearchQuery from '../../ui/inputs/SearchQuery';

function Header(props) {
  const state = props.filter;
  const filterHandler = props.onFilter;

  return (
    <div className={styles.container}>
      <div>
        <SearchQuery
          placeholder={'Rechercher un Client'}
          icon={FaSearch}
          onSearch={props.onSearch}
        />
      </div>
      <div>
        <div className={styles.radio}>
          <input
            type='radio'
            name='type'
            value='tout'
            checked={state === 'tout'}
            onChange={filterHandler}
          />{' '}
          Tout
          <input
            type='radio'
            name='type'
            value='individuelle'
            checked={state === 'individuelle'}
            onChange={filterHandler}
          />{' '}
          Individuelle
          <input
            type='radio'
            name='type'
            value='societe'
            checked={state === 'societe'}
            onChange={filterHandler}
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
