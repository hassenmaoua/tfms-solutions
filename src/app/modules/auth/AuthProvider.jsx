import { useContext, useState, useRef, useEffect, createContext } from 'react';
import * as authHelper from './core/AuthHelpers';
import { getUserByToken } from './core/requests';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../../assets/helpers';

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
};

const AuthContext = createContext(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState();

  const saveAuth = (auth) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = async () => {
    // await logoutt();
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        saveAuth,
        currentUser,
        setCurrentUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit = ({ children }) => {
  const { auth, logout, setCurrentUser } = useAuth();
  const didRequest = useRef(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const data = await getUserByToken();
          if (data) {
            setCurrentUser(data.user);
          }
        }
      } catch (error) {
        console.error(error);
        if (!didRequest.current) {
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    if (auth && auth.token) {
      requestUser(auth.token);
    } else {
      logout();
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, []);
  return showSplashScreen ? (
    // showSplashScreen
    <div className='flex h-screen w-screen items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse'>
      <img
        src={toAbsoluteUrl('/media/logos/logo.png')}
        alt='logo.png'
        className='h-[120px] '
      />
      <div role='status'>
        <SVG
          className={`inline w-16 h-16 ms-2 text-gray-900 animate-spin dark:text-gray-200`}
          src={toAbsoluteUrl('/media/icons/gear.svg')}
        />

        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};

export { AuthProvider, AuthInit, useAuth };
