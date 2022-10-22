import { useState, useEffect } from 'react';
import Header from '../components/module/document/Header';
import BodyList from '../components/module/document/BodyList';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import InvoiceModal from '../components/module/document/InvoiceModal';
import Spinner from '../components/layout/Spinner';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Facture() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [response, setResponse] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [document, setDocument] = useState('');

  async function fetchDocuments() {
    try {
      const response = await axiosPrivate.get('/document/list');
      console.log('document : ' + response?.data?.message);
      setResponse(response?.data);
    } catch (err) {
      if (err.response.status === 404) {
        console.log(err.response.data.message);
        setResponse(err.response.data);
      } else {
        console.log(err.message);
        // navigate('/login', { state: { from: location }, replace: true });
      }
    }
  }

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await axiosPrivate.get('/document/list');
        console.log('document : ' + response?.data?.message);
        setResponse(response?.data);
      } catch (err) {
        if (err.response.status === 404) {
          console.log(err.response.data.message);
          setResponse(err.response.data);
        } else {
          console.log(err.message);
          // navigate('/login', { state: { from: location }, replace: true });
        }
      }
    }

    fetchDocuments();
  }, [axiosPrivate]);

  return (
    <Layout>
      <InvoiceModal isOpen={isOpen} setIsOpen={setIsOpen} document={document} />
      <Header
        onButtonClick={() => {
          navigate('/document/ajouter', { replace: false });
        }}
      />
      {response ? (
        <BodyList
          setDocument={setDocument}
          setIsOpen={setIsOpen}
          response={response}
        />
      ) : (
        <Spinner />
      )}
    </Layout>
  );
}

export default Facture;
