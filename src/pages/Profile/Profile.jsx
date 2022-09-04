import { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import PostBoard from '../../Components/PostBoard/PostBoard';

// REDUX

import { useParams } from 'react-router-dom';
import InformationPanel from '../../Components/InformationPanel/InformationPanel';
import useFetchProfile from '../../Hooks/useFetchProfile';
import useFetchAvatar from '../../Hooks/useFetchAvatar';

const Profile = ({}) => {
  let { userId } = useParams();
  const { profile } = useFetchProfile(userId);
  return (
    <>
      <Header />
      <InformationPanel profileData={profile?.profileData} />

      <PostBoard postFromUser={true} geterPostFromUser={profile?.posts} />
    </>
  );
};

export default Profile;
