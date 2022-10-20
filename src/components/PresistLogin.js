import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import Spinner from './layout/Spinner';

function PresistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    const verfiyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verfiyRefreshToken() : setIsLoading(false);
  }, [auth?.accessToken, refresh]);

  useEffect(() => {}, [auth?.accessToken, isLoading]);

  return <>{isLoading ? <Spinner /> : <Outlet />}</>;
}

export default PresistLogin;
