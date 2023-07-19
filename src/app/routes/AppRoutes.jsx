import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Public from '../pages/Public';
import App from '../App';
import Logout from '../modules/auth/Logout';
import PrivateRoutes from './PrivateRoutes';
import ErrorPage from '../modules/errors/ErrorPage';
import PublicRoutes from './PublicRoutes';
import { useAuth } from '../modules/auth/AuthProvider';

const AppRoutes = () => {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Public />} />
          <Route path='/error/*' element={<ErrorPage />} />
          <Route path='/logout' element={<Logout />} />

          {currentUser ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
            </>
          ) : (
            <>
              <Route path='/*' element={<PublicRoutes />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
