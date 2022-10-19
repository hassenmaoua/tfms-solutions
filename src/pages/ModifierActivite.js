import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Body from '../components/module/activite/modifier/Body';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Spinner from '../components/layout/Spinner';

function ModifierProduit() {
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  const [respone, setRespone] = useState('');

  useEffect(() => {
    async function fetchProduit() {
      try {
        const response = await axiosPrivate.get(`/produit/${params.id}`);
        console.log('Client : ' + response?.data?.message);
        setRespone(response?.data);
      } catch (err) {
        if (err.response.status === 404) {
          console.log(err.response?.data.message);
          setRespone(err.response?.data);
        } else {
          console.log(err.message);
        }
      }
    }
    fetchProduit();
  }, [axiosPrivate, params.id]);

  return (
    <Layout>{respone ? <Body respone={respone}> </Body> : <Spinner />}</Layout>
  );
}

export default ModifierProduit;
