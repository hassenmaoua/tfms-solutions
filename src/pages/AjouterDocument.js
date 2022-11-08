import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import DocumentForm from '../components/module/document/ajouter/DocumentForm';
import Spinner from '../components/layout/Spinner';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function FactureForm() {
  const axiosPrivate = useAxiosPrivate();

  const [response, setResponse] = useState('');
  const [clientList, setClientList] = useState('');

  useEffect(() => {
    async function fetchClients() {
      try {
        const respone = await axiosPrivate.get('/client/list');
        let filteredList = respone?.data?.data.map(
          ({ _id, intitule, identifiantFiscal, adresse }) => ({
            _id,
            intitule,
            identifiantFiscal,
            adresse,
          })
        );

        setClientList(filteredList);
        setResponse(respone.data);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchClients();
  }, [axiosPrivate]);

  return (
    <Layout>
      {response ? <DocumentForm clientList={clientList} /> : <Spinner />}
    </Layout>
  );
}

export default FactureForm;
