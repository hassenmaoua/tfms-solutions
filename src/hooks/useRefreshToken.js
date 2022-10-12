// import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    //const response = await axios.get('/refresh');
    const jwt = localStorage.getItem('jwt');
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
