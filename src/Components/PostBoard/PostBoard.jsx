import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import { getInitPosts } from '../../Redux/actions/postsActions';
import MakeAComment from '../MakeAComment/MakeAComment';
import { useNavigate } from 'react-router-dom';
const PostBoard = ({
  posts,
  reloadHomePage,
  postFromUser = false,
  geterPostFromUser,
}) => {
  let isProfile = postFromUser;

  const [renderPosts, setRenderPosts] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (postFromUser) {
      // is a user POST
      return setRenderPosts(geterPostFromUser);
    }
    if (!postFromUser) {
      // is NOT a user POST
      return setRenderPosts(posts);
    }
  }, [posts, geterPostFromUser]);
  return (
    <>
      <MakeAComment />
      {isProfile && <div></div>}
      {isProfile ? (
        <div className="Posts_Container">
          {renderPosts?.map((p) => (
            <Post postData={p} key={p._id} />
          ))}
        </div>
      ) : (
        <div className="Posts_Container">
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
});

const mapDispatchToProps = (dispatch) => ({
  reloadHomePage() {
    dispatch(getInitPosts());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostBoard);
