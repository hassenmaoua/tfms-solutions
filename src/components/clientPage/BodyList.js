import styles from './BodyList.module.css';
import Card from './Card';

function BodyList(props) {
  const response = props.response;
  const data = response.data;

  if (response.status)
    return (
      <div className={styles.container}>
        {data.length ? (
          data.map((item, index) => {
            return (
              <Card
                key={index}
                client={item}
                onDelete={props.onDelete}
                onEdit={props.onEdit}
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
