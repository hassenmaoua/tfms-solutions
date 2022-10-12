import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Header from '../components/clientPage/Header';
import BodyList from '../components/clientPage/BodyList';
import NewClientForm from '../components/clientPage/NewClientForm';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import ModifyClientForm from '../components/clientPage/ModifyClientForm';
import Spinner from '../components/layout/Spinner';

function Client() {
  const axiosPrivate = useAxiosPrivate();
  const [response, setResponse] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isModifyOpen, setIsModifyOpen] = useState(false);

  async function fetchClients() {
    try {
      const response = await axiosPrivate.get('/client/list');
      console.log('Client : ' + response?.data?.message);
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
    async function fetchClients() {
      try {
        const response = await axiosPrivate.get('/client/list');
        console.log('Client : ' + response?.data?.message);
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

    fetchClients();
  }, [axiosPrivate]);

  async function submitHandler(event, data) {
    event.preventDefault();
    try {
      const response = await axiosPrivate.post('/client', data);
      console.log(response?.data?.message);
      setIsFormOpen(false);
      fetchClients();
    } catch (err) {
      console.log(err.message);
    }
  }

  async function updateSubmitHandler(event, data, id) {
    event.preventDefault();
    try {
      const response = await axiosPrivate.patch(`/client/${id}`, data);
      console.log(response?.data?.message);
      setIsModifyOpen(false);
      fetchClients();
    } catch (err) {
      console.log(err.message);
    }
  }

  async function deleteHandler(client) {
    try {
      const response = await axiosPrivate.delete('/client/' + client._id);
      console.log(response?.data?.message);
      fetchClients();
    } catch (err) {
      console.log(err.message);
    }
  }

  const [client, setClient] = useState('');

  function editHandler(client) {
    setClient(client);
    setIsModifyOpen(true);
  }

  const [inputText, setInputText] = useState('');
  let searchInputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    console.log(lowerCase);
    setInputText(lowerCase);
  };

  const [filter, setFilter] = useState('tout');
  let filterHandler = (e) => {
    setFilter(e.target.value);
  };

  return (
    <Layout>
      <Header
        onSearch={searchInputHandler}
        onFilter={filterHandler}
        filter={filter}
        onButtonClick={() => {
          setIsFormOpen(true);
        }}
      />
      {response ? (
        <BodyList
          response={response}
          onDelete={deleteHandler}
          onEdit={editHandler}
          filterInput={inputText}
          filterRadio={filter}
        />
      ) : (
        <Spinner />
      )}
      {isFormOpen && (
        <NewClientForm
          onSubmit={submitHandler}
          onClose={() => {
            setIsFormOpen(false);
          }}
        />
      )}

      {isModifyOpen && (
        <ModifyClientForm
          client={client}
          onSubmit={updateSubmitHandler}
          onClose={() => {
            setIsModifyOpen(false);
          }}
        />
      )}
    </Layout>
  );
}

export default Client;
