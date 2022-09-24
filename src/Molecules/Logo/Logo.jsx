import React from 'react';
import { useNavigate } from 'react-router-dom';

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
        <span className="logoIcon_text">POSTWEB</span>
      </span>
    </div>
  );
};

export default Logo;
