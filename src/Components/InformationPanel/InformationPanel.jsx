import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';
import { TbBallon, TbMail, TbCalendar } from 'react-icons/tb';
import useNumberToDate from '../../Hooks/useNumberToDate';

import './styles.InformationPanel.css';

// REDUX
import { connect } from 'react-redux';
import ProfileImage from '../../Molecules/ProfileImage/ProfileImage';

const InformationPanel = ({
  profileData, // this is fetched DATA
  profile, // this is MY USER DATA
}) => {
  const navigate = useNavigate();

  const [isMyProfile, setIsMyProfile] = useState(false);

  const toSettings = () => {
    navigate('/profile/settings', { replace: false });
  };

  useEffect(() => {
    setIsMyProfile(profileData?._id === profile?._id);
  }, [profileData]);

  return (
    <div className="informationPanel marginHeader">
      <div className="userImageInformation">
        <ProfileImage src={profileData?.image} />
      </div>
      <div className="userInformation">
        <span className="name">{profileData?.name}</span>
        <span className="username">{profileData?.username}</span>
        <span className="biography">{profileData?.biography}</span>
        <span>
          <TbBallon />
          Fecha de nacimiento: {useNumberToDate(profileData?.birthdate)}
        </span>
        <span>
          <IoLocationOutline />
          {profileData?.location}
        </span>
        <span>
          <TbMail />
          {profileData?.email}
        </span>
        <span>
          <TbCalendar />
          Se unio en: {useNumberToDate(profileData?.createdAt)}
        </span>
        {isMyProfile && (
          <button className="btn secondary" onClick={toSettings}>
            Editar perfil
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer.myProfileInformation,
});

export default connect(mapStateToProps, {})(InformationPanel);
