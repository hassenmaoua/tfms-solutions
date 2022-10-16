import Header from '../components/facturePage/Header';
import BodyList from '../components/facturePage/BodyList';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
function Facture() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header
        onButtonClick={() => {
          navigate('/facture/ajouter', { replace: false });
        }}
      />
      <BodyList />
    </Layout>
  );
}

export default Facture;
