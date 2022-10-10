import React from 'react';
import { Link } from 'react-router-dom';

function RootContent() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {' '}
      <Link
        style={{
          backgroundColor: '#7ea31050',
          padding: '25px 100px',
          fontSize: '40px',
          borderRadius: '5px',
        }}
        to='/login'
      >
        Login
      </Link>
    </div>
  );
}

export default RootContent;
