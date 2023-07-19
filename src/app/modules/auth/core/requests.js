import axios from 'axios';
import { ErrorAlert } from '../../../../assets/helpers/alertDialogs';

const API_URL = process.env.REACT_APP_API_URL;

export async function register(formData) {
  try {
    await axios.post(`${API_URL}/register`, formData);
  } catch (error) {
    ErrorAlert('Failed to register', error.response.data.message);
    console.error(error);
  }
}

export function login(email, password) {
  return axios.post(`${API_URL}/login`, {
    email,
    password,
  });
}

export async function logoutt() {
  try {
    return await axios.post(`${API_URL}/logout`);
  } catch (error) {
    console.error(error);
  }
}

export async function getUserByToken() {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    console.error(error);
    // Handle error retrieving the user by token
    return undefined;
  }
}
