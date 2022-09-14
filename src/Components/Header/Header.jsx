import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TbMessage2Share } from 'react-icons/tb';
import {
  AiOutlineArrowLeft,
  AiOutlineUser,
  AiFillStar,
  AiOutlineStar,
  AiOutlineSetting,
} from 'react-icons/ai';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import ProfileImage from '../../Molecules/ProfileImage/ProfileImage';
import './styles.Header.css';

const Header = ({ userData, children, section }) => {
  let navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login', { replace: true });
  };
  const goToProfile = (e) => {
    navigate(`/profile/${localStorage.getItem('userID')}`, {
      replace: true,
    });
  };
  const toSettings = () => {
    navigate('/profile/settings', { replace: false });
  };

  useEffect(() => {}, [isActive]);
  console.log(userData);
  return (
    <header className="header">
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
      <div className={`backgroundMenu ${isActive ? 'active' : ''}`}></div>

      <div className="menuContainer">
        <div className="openMenu">
          <div
            onClick={() => {
              setIsActive(true);
            }}
          >
            <ProfileImage src={userData?.image} />
          </div>
        </div>
        {/* In this menu have Count information */}
        <ul className={`menu_list ${isActive ? 'active' : ''}`}>
          <div>
            <button
              onClick={() => {
                setIsActive(false);
              }}
              className="btn secondary"
            >
              X
            </button>
            <span>Informacion de la cuenta</span>
          </div>
          <div className="accountInfo_menu" onClick={goToProfile}>
            <ProfileImage src={userData?.image} />
            <span>{userData?.username}</span>
          </div>
          <li>
            <AiOutlineUser />
            Mi perfil
          </li>
          <li>
            <AiOutlineStar /> {/* <AiFillStar/> */} Guardados
          </li>

          <li>
            <AiOutlineSetting />
            <Link to="/profile/settings">Mis datos</Link>
          </li>
          <li>
            <button className="btn secondary" onClick={handleLogout}>
              Cerrar Sesion
            </button>
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
