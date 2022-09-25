import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getPostFromHome,
  handleWriteComment,
  getPostsWithProfile,
  makeToast,
} from '../../Redux/actions/postsActions';
import ComposePost from '../ComposePost';

//SKELETON
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Post from '../Post/Post';

const FavoritesBoard = ({ userData, isFavPage }) => {
  useEffect(() => {}, [userData]);
  const skeletonPost = (
    <div className={'Post postBox gridPost'} style={{ marginBlock: '1rem' }}>
      <Skeleton
        style={{ margin: ' .2rem .5rem' }}
        circle={true}
        width="4rem"
        height="4rem"
      />
      <Skeleton
        style={{ margin: ' .2rem 1rem' }}
        width="70vw"
        height=""
        count={3}
      />
    </div>
  );

  return (
    <div className="favoritesBoard">
      <h3>Tus post favoritos</h3>
      <div className="Posts_Container ">
        {isFavPage &&
          userData?.favoritePosts &&
          userData?.favoritePosts?.map((postID) => (
            <ComposePost key={postID} postID={postID} isFavPage={isFavPage} />
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.profileReducer.myProfileInformation,
});
const mapDispatchToProps = (dispatch) => ({
  makingComment(postData, profile) {
    dispatch(getPostFromHome(postData, profile));
    dispatch(handleWriteComment(true));
  },
  fetchUserProfile(profileID) {
    dispatch(getPostsWithProfile(profileID));
  },
  handleToast(status, msg) {
    dispatch(makeToast(status, msg));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesBoard);
