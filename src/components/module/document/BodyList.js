import styles from './BodyList.module.css';
import RowItem from './RowItem';

function BodyList(props) {
  const response = props.response;
  const data = response.data;

  const filteredData = data.filter((document) => {
    if (
      props.filterRadio.toLowerCase() === 'bon de livraison' &&
      document.intitule.toLowerCase() === 'bon de livraison'
    ) {
      if (props.filterInput === '') {
        return document;
      } else {
        return document.dopiece.toLowerCase().includes(props.filterInput);
      }
    } else if (
      props.filterRadio.toLowerCase() === 'facture' &&
      document.intitule.toLowerCase() === 'facture'
    ) {
      if (props.filterInput === '') {
        return document;
      } else {
        return document.intitule.toLowerCase().includes(props.filterInput);
      }
    } else if (props.filterRadio === 'tout') {
      if (props.filterInput === '') {
        return document;
      } else {
        return document.intitule.toLowerCase().includes(props.filterInput);
      }
    }
  });

  if (response.status)
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div style={{ width: '20%' }}>
            <span>Reference</span>
          </div>
          <div style={{ width: '10%' }}>
            <span>date</span>
          </div>
          <div style={{ width: '20%' }}>
            <span>bénéficiaire</span>
          </div>
          <div style={{ width: '10%' }}>
            <span>status</span>
          </div>
          <div style={{ width: '20%' }}>
            <span>total TTC</span>
          </div>
          <div style={{ width: '20%' }}>
            <span>actions</span>
          </div>
        </div>

        {filteredData.length ? (
          filteredData.map((item, index) => {
            return (
              <RowItem
                key={index}
                item={item}
                onDelete={props.onDelete}
                setDocument={props.setDocument}
                setIsOpen={props.setIsOpen}
              />
            );
          })
        ) : (
          <h2>Aucun donneés disponible</h2>
        )}
      </div>
    );
  else return <h1>{response.message}</h1>;
}

export default BodyList;
