import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  const container = {
    height: 300,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',

    left: 'calc(50% - 515px / 2)',
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
      <h5>
        Nous sommes vraiment désolés pour ce désagrément. Il semble que vous
        essayez d'accéder à <br /> une page qui a été supprimée ou qui n'a
        jamais existé.
      </h5>
      <Link to='/'>Retour à la page d'accueil</Link>
    </div>
  );
}

export default NotFound;
