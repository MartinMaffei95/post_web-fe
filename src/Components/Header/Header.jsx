import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login', { replace: true });
  };
  const goToProfile = (e) => {
    navigate(`/profile/${e.target.getAttribute('data-user-id')}`, {
      replace: true,
    });
  };
  return (
    <header className="header">
      <h3
        onClick={() => {
          navigate('/', { replace: true });
        }}
      >
        PostWEB
      </h3>
      <span data-user-id={localStorage.getItem('userID')} onClick={goToProfile}>
        {localStorage.getItem('username')}
      </span>
      <button onClick={handleLogout}> Cerrar Sesion </button>
    </header>
  );
};

export default Header;
