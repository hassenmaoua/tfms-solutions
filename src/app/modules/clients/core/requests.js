import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const CLIENTS_URL = API_URL + '/clients';

export const getClients = async (query) => {
  const response = await axios.get(`${CLIENTS_URL}/?${query}`);

  return response.data;
};

export const getClientById = async (clientId) => {
  const response = await axios.get(`${CLIENTS_URL}/${clientId}`);

  return response.data;
};
export const updateClient = async (clientId, formData) => {
  const response = await axios.put(`${CLIENTS_URL}/${clientId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const createClient = async (formData) => {
  const response = await axios.post(CLIENTS_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
