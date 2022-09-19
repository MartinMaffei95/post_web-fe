import { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import PostBoard from '../../Components/PostBoard/PostBoard';
import { useParams } from 'react-router-dom';
import useFetchProfile from '../../Hooks/useFetchProfile';
import InformationPanel from '../../Components/InformationPanel/InformationPanel';

// REDUX
import { connect } from 'react-redux';
import { getPostsWithProfile } from '../../Redux/actions/postsActions';

import { Helmet } from 'react-helmet';
import NewPostBtn from '../../Molecules/NewPostBtn/NewPostBtn';
const Profile = ({ myPosts, fetchUserProfile }) => {
  let { userId } = useParams();
  const { profile } = useFetchProfile(userId);

  useEffect(() => {}, [myPosts]);
  return (
    <>
      <Helmet>
        <title>PostWeb | {`Perfil de ${profile?.profileData?.username}`}</title>
      </Helmet>
      <Header />
      <NewPostBtn />
      <InformationPanel profileData={profile?.profileData} />
      <PostBoard postFromUser={true} geterPostFromUser={profile?.posts} />
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.postReducer.posts,
  myPosts: state.postReducer.myPosts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile(profileID, token) {
    dispatch(getPostsWithProfile(profileID, token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
