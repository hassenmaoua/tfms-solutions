import axios from 'axios';

const url = 'https://lwm-api.herokuapp.com/api';
const local = 'http://192.168.1.9:80/api';

export default axios.create({
  baseURL: url,
  withCredentials: true,
  credentials: 'include',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export const axiosPrivate = axios.create({
  baseURL: local,
  withCredentials: true,
  credentials: 'include',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});
