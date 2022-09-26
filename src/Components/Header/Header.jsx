import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TbMessage2Share } from 'react-icons/tb';
import {
  AiOutlineArrowLeft,
  AiOutlineUser,
  AiFillStar,
  AiOutlineStar,
  AiOutlineSetting,
  AiOutlineClose,
} from 'react-icons/ai';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import ProfileImage from '../../Molecules/ProfileImage/ProfileImage';
import './styles.Header.css';
import LateralMenu from '../LateralMenu/LateralMenu';
import Logo from '../../Molecules/Logo/Logo';
import useLogOut from '../../Hooks/useLogOut';

const Header = ({ userData, children, section }) => {
  let navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('username');
  //   navigate('/login', { replace: true });
  // };
  const { handleLogout } = useLogOut();
  const goToProfile = (e) => {
    navigate(`/profile/${localStorage.getItem('userID')}`, {
      replace: true,
    });
  };
  const toSettings = () => {
    navigate('/profile/settings', { replace: false });
  };

  useEffect(() => {}, [isActive]);
  return (
    <header className="header">
      <Logo />
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
        <LateralMenu
          onHeader={true}
          isActive={isActive}
          setIsActive={setIsActive}
          userData={userData}
          goToProfile={goToProfile}
        />
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  userData: state.profileReducer.myProfileInformation,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
