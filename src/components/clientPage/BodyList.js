import styles from './BodyList.module.css';
import Card from './Card';

function BodyList(props) {
  const response = props.response;
  const data = response.data;

  const filteredData = data.filter((client) => {
    if (props.filterRadio === 'individuelle' && client.isIndividual) {
      console.log(props.filterRadio, client.isIndividual);
      if (props.filterInput === '') {
        return client;
      } else {
        return client.intitule.toLowerCase().includes(props.filterInput);
      }
    } else if (props.filterRadio === 'societe' && !client.isIndividual) {
      console.log(props.filterRadio, client.isIndividual);
      if (props.filterInput === '') {
        return client;
      } else {
        return client.intitule.toLowerCase().includes(props.filterInput);
      }
    } else if (props.filterRadio === 'tout') {
      console.log(props.filterRadio, client.isIndividual);
      if (props.filterInput === '') {
        return client;
      } else {
        return client.intitule.toLowerCase().includes(props.filterInput);
      }
    }
  });

  if (response.status)
    return (
      <div className={styles.container}>
        {filteredData.length ? (
          filteredData.map((item, index) => {
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
