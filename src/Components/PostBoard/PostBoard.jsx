import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import { getInitPosts } from '../../Redux/actions/postsActions';
const PostBoard = ({
  posts,
  reloadHomePage,
  postFromUser = false,
  geterPostFromUser,
}) => {
  let isProfile = postFromUser;

  useEffect(() => {
    if (!isProfile) {
      reloadHomePage();
    }
  }, []);
  return (
    <>
      {isProfile && <div></div>}
      {isProfile ? (
        <div className="Posts_Container">
          <h3 className="title">Publicaciones</h3>
          {geterPostFromUser?.map((p) => (
            <Post postData={p} key={p._id} />
          ))}
        </div>
      ) : (
        <div className="Posts_Container">
          <h3 className="title">Publicaciones</h3>
          {posts?.map((p) => (
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
