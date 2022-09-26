import React from 'react';
import { useNavigate } from 'react-router-dom';
const useLogOut = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login', { replace: true });
  };
  return { handleLogout };
};

export default useLogOut;
