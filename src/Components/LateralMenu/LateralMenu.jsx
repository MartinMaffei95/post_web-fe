import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AiOutlineArrowLeft,
  AiOutlineUser,
  AiFillStar,
  AiOutlineStar,
  AiOutlineSetting,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineMore,
} from 'react-icons/ai';
import ProfileImage from '../../Molecules/ProfileImage/ProfileImage';
import './styles.LateralMenu.css';
import Logo from '../../Molecules/Logo/Logo';
import ListItem from '../../Molecules/ListItem/ListItem';

// MUI COMPONENT
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useLogOut from '../../Hooks/useLogOut';

const LateralMenu = ({
  onHeader = false,
  isActive,
  setIsActive,
  userData,
  goToProfile,
}) => {
  const navigate = useNavigate();
  const { handleLogout } = useLogOut();
  const [openMenu, setOpenMenu] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl;
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (onHeader) {
    return (
      <ul className={`menu_list ${isActive ? 'active' : ''}`}>
        <div className="closeMenuContainer">
          <button
            onClick={() => {
              setIsActive(false);
            }}
            className="btn secondary closeBtn"
          >
            <AiOutlineClose />
          </button>
          <span>Informacion de la cuenta</span>
        </div>
        <div className="accountInfo_menu" onClick={goToProfile}>
          <ProfileImage src={userData?.image} />
          <span>{userData?.username}</span>
        </div>
        <li>
          <AiOutlineUser />
          <div className="link">
            <Link to={`/profile/${localStorage.getItem('userID')}`}>
              Mi perfil
            </Link>
          </div>
        </li>
        <li>
          <AiOutlineStar />
          <div className="link">
            <Link to="/compose/favorites">Favoritos</Link>
          </div>
        </li>
        {/* <AiFillStar/> */}
        <li>
          <AiOutlineSetting />
          <div className="link">
            <Link to="/profile/settings">Mis datos</Link>
          </div>
        </li>
        <li className="menu_list_closeSession">
          <button className="btn secondary" onClick={handleLogout}>
            Cerrar Sesion
          </button>
        </li>
      </ul>
    );
  } else {
    return (
      <ul className={`menu_list staticMenu`}>
        <div className={`logoContainer`}>
          <Logo />
        </div>
        <ListItem icon={<AiOutlineHome />} text="Inicio" link={true} to={`/`} />
        <ListItem
          icon={<AiOutlineUser />}
          text="Mi perfil"
          link={true}
          to={`/profile/${localStorage.getItem('userID')}`}
        />
        <ListItem
          icon={<AiOutlineStar />}
          text="Guardados"
          link={true}
          to={'/compose/favorites'}
        />
        <ListItem
          icon={<AiOutlineSetting />}
          text="Mis datos"
          link={true}
          to={'/profile/settings'}
        />

        <ListItem
          icon={<AiOutlineMore />}
          text="Mas opciones"
          extraAction={handleClick}
        />

        <Menu
          id="basic-menu"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleLogout}>Cerrar Sesion</MenuItem>
        </Menu>
        <div
          className="accountInfo_menu"
          onClick={() => {
            navigate(`/profile/${localStorage.getItem('userID')}`, {
              replace: true,
            });
          }}
        >
          <ProfileImage src={userData?.image} />
          <span>{userData?.username}</span>
        </div>
      </ul>
    );
  }
};

export default LateralMenu;
