import styles from './Header.module.css';
import IconButton from '../buttons/IconButton';
import SearchQuery from '../inputs/SearchQuery';
import { IoIosAddCircle } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

function Header(props) {
  return (
    <div className={styles.container}>
      <div>
        <SearchQuery placeholder={'Rechercher un porduit'} icon={FaSearch} />
      </div>
      <div>
        <IconButton
          icon={IoIosAddCircle}
          onClick={props.onButtonClick}
          color='#213502'
        >
          Ajouter Produit
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
