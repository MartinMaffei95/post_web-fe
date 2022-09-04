import React from 'react';
import { connect } from 'react-redux';

export const useRedirectProfile = (target) => {
  const goToProfile = (target) => {
    navigate(`/profile/${target.target.getAttribute('data-user-id')}`, {
      replace: true,
    });
  };
};

const mapStateToProps = (state) => ({
  posts: state.postReducer.posts,
  profileSelectedInfo: state.profileReducer.profileSelectedInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getProfilePosts(profileID) {
    dispatch(getPostsWithProfile(profileID));
  },
  getProfileInformation(profileID) {
    dispatch(getProfileInformation(profileID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(useRedirectProfile);
