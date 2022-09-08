import React from 'react';

import { FaUserCircle } from 'react-icons/fa';

const InformationPanel = ({ profileData }) => {
  return (
    <div className="informationPanel">
      <div className="userImage">
        <img className="userImage_image" src={profileData?.image} />
      </div>
      <div className="userInformation">
        <button className="btn primary">Editar perfil</button>
        <span>{profileData?.username}</span>
        <span>{profileData?.email}</span>
      </div>
    </div>
  );
};

export default InformationPanel;
