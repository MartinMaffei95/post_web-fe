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

const PostBoard = ({
  posts,
  reloadHomePage,
  postFromUser = false,
  geterPostFromUser,
  myPosts,
}) => {
  let isProfile = postFromUser;

  const [renderPosts, setRenderPosts] = useState();

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
      ) : (
        <div className="Posts_Container marginHeader">
          {renderPosts?.map((p) => (
            <Post postData={p} key={p._id} reloadFunction={reloadHomePage} />
          ))}
        </div>
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
