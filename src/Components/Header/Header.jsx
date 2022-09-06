import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TbMessage2Share } from 'react-icons/tb';
import { AiFillCaretDown } from 'react-icons/ai';
import { connect } from 'react-redux';
import { useEffect } from 'react';
const Header = ({ userData }) => {
  let navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
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

  useEffect(() => {}, [isActive]);
  return (
    <header className="header">
      <div
        className="logoContainer"
        onClick={() => {
          navigate('/', { replace: true });
        }}
      >
        <span className="logoIcon">
          <span className="logoIcon_text">Inicio</span>
          <hr />
        </span>
      </div>
      <div className={`backgroundMenu ${isActive ? 'active' : ''}`}></div>

      <div className="menuContainer">
        <div className="openMenu">
          <div
            className="userImage"
            onClick={() => {
              setIsActive(true);
            }}
          >
            <img className="userImage_image" src={userData?.image} />
          </div>
        </div>
        {/* In this menu have Count information */}
        <ul className={`menu_list ${isActive ? 'active' : ''}`}>
          <div>
            <button
              onClick={() => {
                setIsActive(false);
              }}
            >
              X
            </button>
            <span>Informacion de la cuenta</span>
          </div>
          <div className="accountInfo_menu">
            <div className="userImage">
              <img className="userImage_image" src={userData?.image} />
            </div>
            <span>{userData?.username}</span>
            <hr />
          </div>
          <li>Mi perfil</li>
          <li>Opcion 2</li>
          <li>Opcion 3</li>
          <li>
            <button onClick={handleLogout}> Cerrar Sesion </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  userData: state.profileReducer.myProfileInformation,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
