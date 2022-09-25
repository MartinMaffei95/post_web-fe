import React from 'react';
import './styles.ProfileImage.css';
import { FaUserAltSlash } from 'react-icons/fa';
//SKELETON
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProfileImage = ({ src, classname = '' }) => {
  return (
    <div className={`userImage  ${classname} `}>
      {src ? (
        <img className={`userImage_image  ${classname} `} src={src} />
      ) : src === '' ? (
        <FaUserAltSlash
          className={`userImage_image  ${classname} `}
          style={{
            color: 'red',
            filter: 'blur(2px)',
          }}
        />
      ) : (
        <Skeleton circle={true} className={`userImage_image  ${classname} `} />
      )}
    </div>
  );
};

export default ProfileImage;
