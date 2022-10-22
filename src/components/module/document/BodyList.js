import styles from './BodyList.module.css';
import RowItem from './RowItem';

function BodyList(props) {
  const response = props.response;
  const data = response.data;

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

        {data.length ? (
          data.map((item, index) => {
            return (
              <RowItem
                key={index}
                item={item}
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
