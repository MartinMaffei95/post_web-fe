import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FaUserCircle } from 'react-icons/fa';

// REDUX
import { connect } from 'react-redux';

const InformationPanel = ({
  profileData, // this is fetched DATA
  profile, // this is MY USER DATA
}) => {
  const navigate = useNavigate();

  const [isMyProfile, setIsMyProfile] = useState(false);

  const toSettings = () => {
    navigate('/profile/settings', { replace: true });
  };

  useEffect(() => {
    setIsMyProfile(profileData?._id === profile?._id);
  }, [profileData]);

  return (
    <div className="informationPanel marginHeader">
      <div className="userImage">
        <img className="userImage_image" src={profileData?.image} />
      </div>
      <div className="userInformation">
        {isMyProfile && (
          <button className="btn primary" onClick={toSettings}>
            Editar perfil
          </button>
        )}
        <span>{profileData?.username}</span>
        <span>{profileData?.email}</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer.myProfileInformation,
});

export default connect(mapStateToProps, {})(InformationPanel);
