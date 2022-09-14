import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import MakeAComment from '../../Components/MakeAComment/MakeAComment';
import Post from '../../Components/Post/Post';
import useFetchPost from '../../Hooks/useFetchPost';

import { connect } from 'react-redux';
import { handleWriteComment } from '../../Redux/actions/postsActions';

const PostPage = ({ handleWriteComment }) => {
  let { postId } = useParams();
  const { post } = useFetchPost(postId);
  const [renderPost, setRenderPost] = useState();

  useEffect(() => {
    setRenderPost(post);
  }, [post, handleWriteComment]);

  return (
    <>
      <Header />
      <div className="Posts_Container postPage marginHeader">
        {renderPost?.post && <Post postData={renderPost?.post} />}
      </div>
      <hr />
      {/* Coments */}
      <div>
        {renderPost?.comments?.map((c) => (
          <Post postData={c} key={c?._id} />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  writtingComment: state.postReducer.writtingComment,
});
const mapDispatchToProps = (dispatch) => ({
  handleWrittingComment(state) {
    dispatch(handleWriteComment(state));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
