import React from 'react';
import styles from './LoginForm.module.css';
import LOGO from '../assets/images/logo.png';
import Button from '../buttons/Button';
import Input from '../inputs/Input';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';

function LoginForm() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const userRef = useRef();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [user, password]);

  async function handleSubmit(e) {
    e.preventDefault();

    const body = JSON.stringify({ email: user, password: password });

    try {
      const response = await axios.post('/login', body);
      console.log(response?.data?.message);

      const isConnected = response.data.status;
      const accessToken = response.data.accessToken;

      //localStorage.setItem('jwt', accessToken);
      //localStorage.setItem('isConnected', isConnected);

      setAuth({ isConnected, accessToken });

      setUser('');
      setPassword('');

      navigate('/home', { replace: true });
    } catch (err) {
      if (
        err.response?.status === 400 ||
        err.response?.status === 404 ||
        err.response?.status === 500
      ) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    }
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <img src={LOGO} alt='Logo'></img>
      <h2>Connectez-vous à votre compte</h2>
      <h3 className={styles.err}>{error}</h3>
      <Input
        id='email'
        label='Email'
        type='text'
        refc={userRef}
        onChange={(e) => {
          setUser(e.target.value);
        }}
        value={user}
      />

      <Input
        id='password'
        label='Mot de passe'
        type='password'
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />

      <Input id='isStayConnected' label='Restez connecté' type='checkbox' />

      <Button x={'login'}>Login</Button>

      <a href='http://localhost:80/home'>Mot de passe Oublier?</a>
    </form>
  );
}

export default LoginForm;
