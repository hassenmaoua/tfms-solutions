import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  const container = {
    height: 300,
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
    top: 'calc(50% - 300px / 2)',
  };

  const h404 = {
    margin: 0,
    fontWeight: 700,
    fontSize: 60,
  };

  return (
    <div style={container}>
      <h1 style={h404}>404</h1>
      <h1>Ooups, page not found</h1>
      <h4>
        Nous sommes vraiment désolés pour ce désagrément. Il semble que vous
        essayez d'accéder à <br /> une page qui a été supprimée ou qui n'a
        jamais existé.
      </h4>
      <Link to='/'>Retourner à la page d'accueil</Link>
    </div>
  );
}

export default NotFound;
