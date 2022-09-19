import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import { getInitPosts } from '../../Redux/actions/postsActions';
import MakeAComment from '../MakeAComment/MakeAComment';
import { useNavigate } from 'react-router-dom';

// TOASTIFY
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//SKELETON
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PostBoard = ({
  posts,
  reloadHomePage,
  postFromUser = false,
  geterPostFromUser,
  myPosts,
}) => {
  let isProfile = postFromUser;

  const [renderPosts, setRenderPosts] = useState();

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

  const navigate = useNavigate();
  const notify = () => toast('Wow so easy!');
  useEffect(() => {
    if (postFromUser) {
      // is a user POST
      return setRenderPosts(geterPostFromUser);
    }
    if (!postFromUser) {
      // is NOT a user POST
      return setRenderPosts(posts);
    }
  }, [posts, geterPostFromUser, myPosts]);
  return (
    <>
      <ToastContainer />
      {isProfile && <div></div>}
      {isProfile ? (
        <div className="Posts_Container">
          {renderPosts?.map((p) => (
            <Post postData={p} key={p._id} />
          ))}
        </div>
      ) : renderPosts ? (
        <div className="Posts_Container marginHeader">
          {renderPosts?.map((p) => (
            <Post postData={p} key={p._id} reloadFunction={reloadHomePage} />
          ))}
        </div>
      ) : (
        (skeletonPost, skeletonPost, skeletonPost, skeletonPost)
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.postReducer.posts,
  myPosts: state.postReducer.myPosts,
});

const mapDispatchToProps = (dispatch) => ({
  reloadHomePage() {
    dispatch(getInitPosts());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostBoard);
