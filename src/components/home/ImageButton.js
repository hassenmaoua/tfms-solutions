import { Link } from 'react-router-dom';
import styles from './ImageButton.module.css';

function ImageButton(props) {
  const custom = {
    backgroundImage: `url(${props.image})`,
    backgroundSize: 'cover',
  };

  const color1 = 'rgba(0,0,0,1)';
  const color2 = 'rgba(0,0,0,0.6)';
  const color3 = 'rgba(255,255,255,0.2)';

  const override = {
    background: `linear-gradient(90deg, ${color1} 0%, ${color2} 35%, ${color3} 100%), url(${props.image})`,
    backgroundSize: 'cover',
  };
  return (
    <Link to={props.path} style={override} className={styles.container}>
      <div style={{ width: '60%' }}>
        <h2>{props.title}</h2>
        <p>{props.text}</p>
      </div>
    </Link>
  );
}

export default ImageButton;
