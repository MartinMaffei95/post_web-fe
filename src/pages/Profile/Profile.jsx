import { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import PostBoard from '../../Components/PostBoard/PostBoard';
// REDUX

import { useParams } from 'react-router-dom';
import InformationPanel from '../../Components/InformationPanel/InformationPanel';
import useFetchProfile from '../../Hooks/useFetchProfile';

import { connect } from 'react-redux';
import { getPostsWithProfile } from '../../Redux/actions/postsActions';
const Profile = ({ myPosts }) => {
  let { userId } = useParams();
  const { profile } = useFetchProfile(userId);

  useEffect(() => {
    // setProfile(myPosts);
  }, [myPosts]);
  return (
    <>
      <Header />
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
  fetchUserProfile(profileID) {
    dispatch(getPostsWithProfile(profileID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
