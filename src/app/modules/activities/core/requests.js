import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const ACTIVITES_URL = API_URL + '/activities';
const CLIENTS_URL = API_URL + '/clients';
const STATES_URL = API_URL + '/states';

export const getActivities = async (query) => {
  const response = await axios.get(`${ACTIVITES_URL}/?${query}`);
  return response.data;
};

export const getActivityById = async (id) => {
  const response = await axios.get(`${ACTIVITES_URL}/${id}`);
  return response.data;
};

export const createActivity = async (formData) => {
  const response = await axios.post(`${ACTIVITES_URL}`, formData);
  return response.data;
};

export const updateActivity = async (activityId, updateData) => {
  const response = await axios.put(
    `${ACTIVITES_URL}/${activityId}`,
    updateData
  );
  return response.data;
};

export const getAllClients = async () => {
  const response = await axios.get(`${CLIENTS_URL}/all`);
  return response.data;
};

export const getStatesByCode = async (code) => {
  const response = await axios.get(`${STATES_URL}/${code}`);

  return response.data;
};
