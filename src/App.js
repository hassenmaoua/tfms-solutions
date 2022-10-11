import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';

import Accueil from './pages/Accueil';
import Produit from './pages/Produit';
import Client from './pages/Client';
import Facture from './pages/Facture';
import Root from './pages/Root';
import DetailsProduit from './pages/DetailsProduit';
import ModifierProduit from './pages/ModifierProduit';
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
          <Route path='/produit' element={<Produit />} />
          <Route path='/client' element={<Client />} />
          <Route path='/facture' element={<Facture />} />
          <Route path='/produit/:id' element={<DetailsProduit />} />
          <Route path='/produit/modifier/:id' element={<ModifierProduit />} />
        </Route>

        <Route path='/*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
