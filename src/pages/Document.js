import { useState } from 'react';
import Header from '../components/module/document/Header';
import BodyList from '../components/module/document/BodyList';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import InvoiceModal from '../components/module/document/InvoiceModal';
function Facture() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [document, setDocument] = useState('');
  return (
    <Layout>
      <InvoiceModal isOpen={isOpen} setIsOpen={setIsOpen} document={document} />
      <Header
        onButtonClick={() => {
          navigate('/document/ajouter', { replace: false });
        }}
      />
      <BodyList setDocument={setDocument} setIsOpen={setIsOpen} />
    </Layout>
  );
}

export default Facture;
