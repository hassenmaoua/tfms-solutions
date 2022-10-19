import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';

import Accueil from './pages/Accueil';
import Activite from './pages/Activite';
import Client from './pages/Client';
import Document from './pages/Document';
import Root from './pages/Root';
import DetailsActivite from './pages/DetailsActivite';
import ModifierActivite from './pages/ModifierActivite';
import DocumentForm from './pages/DocumentForm';
import NotFound from './pages/NotFound';
import RequireAuth from './components/RequireAuth';
import PresistLogin from './components/PresistLogin';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Root />} />
      <Route path='/login' element={<Login />} />

      <Route element={<PresistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path='/home' element={<Accueil />} />

          <Route path='/Activite' element={<Activite />} />
          <Route path='/Activite/:id' element={<DetailsActivite />} />
          <Route path='/Activite/modifier/:id' element={<ModifierActivite />} />

          <Route path='/document' element={<Document />} />
          <Route path='/document/ajouter' element={<DocumentForm />} />

          <Route path='/client' element={<Client />} />
        </Route>

        <Route path='/*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
