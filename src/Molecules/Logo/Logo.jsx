import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAstronaut } from 'react-icons/fa';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      className="logoContainer"
      onClick={() => {
        navigate('/', { replace: true });
      }}
    >
      <span className="logoIcon">
        <FaUserAstronaut />
      </span>
    </div>
  );
};

export default Logo;
