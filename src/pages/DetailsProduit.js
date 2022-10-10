import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Body from '../components/detailsProduitPage/Body';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useParams } from 'react-router-dom';

function DetailsProduit() {
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;

  const [response, setResponse] = useState('');

  useEffect(() => {
    async function fetchProduit() {
      try {
        const response = await axiosPrivate.get(`/produit/${id}`);
        console.log('Client : ' + response?.data?.message);
        setResponse(response?.data);
      } catch (err) {
        if (err.response.status === 404) {
          console.log(err.response.data.message);
          setResponse(err.response?.data);
        } else {
          console.log(err.message);
          // navigate('/login', { state: { from: location }, replace: true });
        }
      }
    }

    fetchProduit();
  }, [axiosPrivate, id]);

  function editHandler() {
    navigate(`../../produit/modifier/${params.id}`, { replace: false });
  }
  function deleteHandler() {
    try {
      const response = axiosPrivate.delete('/produit/' + params.id);
      console.log(response?.data);
      navigate(-1);
    } catch (err) {
      console.log(err.message);
    }
  }

  if (response)
    return (
      <Layout>
        <Body
          response={response}
          onEdit={editHandler}
          onDelete={deleteHandler}
        />
      </Layout>
    );
  else return <h1>Loading...</h1>;
}

export default DetailsProduit;
