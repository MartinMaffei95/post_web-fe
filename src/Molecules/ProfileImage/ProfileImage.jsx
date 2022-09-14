import React from 'react';
import './styles.ProfileImage.css';

const ProfileImage = ({ src, classname = '' }) => {
  return (
    <div className={`userImage  ${classname} `}>
      <img className={`userImage_image  ${classname} `} src={src} />
    </div>
  );
};

export default ProfileImage;
