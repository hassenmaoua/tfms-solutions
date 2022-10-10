import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Header from '../components/produitPage/Header';
import BodyList from '../components/produitPage/BodyList';
import NewProduitForm from '../components/produitPage/NewProduitForm';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Produit() {
  const axiosPrivate = useAxiosPrivate();
  const [response, setResponse] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  async function fetchProduits() {
    try {
      const response = await axiosPrivate.get('/produit/list');
      console.log('Produit : ' + response?.data?.message);
      setResponse(response?.data);
    } catch (err) {
      if (err.response.status === 404) {
        console.log(err.response.data.message);
        setResponse(err.response.data);
      } else {
        console.log(err.message);
        //navigate('/login', { state: { from: location }, replace: true });
      }
    }
  }

  useEffect(() => {
    async function fetchProduits() {
      try {
        const response = await axiosPrivate.get('/produit/list');
        console.log('Produit : ' + response.data.message);
        setResponse(response?.data);
      } catch (err) {
        if (err.response.status === 404) {
          console.log(err.response.data.message);
          setResponse(err.response.data);
        } else {
          console.log(err.message);
          //navigate('/login', { state: { from: location }, replace: true });
        }
      }
    }
    fetchProduits();
  }, [axiosPrivate]);

  async function submitHandler(event, data) {
    event.preventDefault();
    try {
      const response = await axiosPrivate.post('/produit', data);
      console.log(response?.data?.message);
      setIsFormOpen(false);
      fetchProduits();
    } catch (err) {
      console.log(err.message);
    }
  }

  async function deleteHandler(id) {
    try {
      const response = await axiosPrivate.delete('/produit/' + id);
      console.log(response?.data);
      fetchProduits();
    } catch (err) {
      console.log(err.message);
    }
  }
  if (response)
    return (
      <Layout>
        <Header
          onButtonClick={() => {
            setIsFormOpen(true);
          }}
        />
        <BodyList response={response} onDelete={deleteHandler} />

        {isFormOpen && (
          <NewProduitForm
            onSubmit={submitHandler}
            onClose={() => {
              setIsFormOpen(false);
            }}
          />
        )}
      </Layout>
    );
  else return <h1>Loading...</h1>;
}

export default Produit;
