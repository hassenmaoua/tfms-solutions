import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    //const response = await axios.get('/refresh');
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      /*try {
        const response = await axios.post('/verify', { jwt });
        if (response?.status !== 201) {
          localStorage.removeItem('jwt');
          setAuth((prev) => {
            return {
              ...prev,
              isConnected: false,
              accessToken: '',
            };
          });
        }
      } catch (err) {
        console.log(err.message);
      }*/
    }
    setAuth((prev) => {
      return {
        ...prev,
        isConnected: true,
        //accessToken: response.data.accessToken,
        accessToken: jwt,
      };
    });
    return jwt;
  };
  return refresh;
};

export default useRefreshToken;
