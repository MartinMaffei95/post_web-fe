import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import MakeAComment from '../../Components/MakeAComment/MakeAComment';
import Post from '../../Components/Post/Post';
import useFetchPost from '../../Hooks/useFetchPost';

import { connect } from 'react-redux';
import { handleWriteComment } from '../../Redux/actions/postsActions';
import { Helmet } from 'react-helmet';

import './styles.PostPage.css';
const PostPage = ({ handleWriteComment }) => {
  let { postId } = useParams();
  const { post } = useFetchPost(postId);
  const [renderPost, setRenderPost] = useState();

  useEffect(() => {
    setRenderPost(post);
  }, [post, handleWriteComment]);

  return (
    <>
      <Helmet>
        <title>
          PostWeb | {`Posteo de ${renderPost?.post?.author?.username}`}
        </title>
      </Helmet>
      <Header />
      <div className="Posts_Container postPage marginHeader bigPost">
        {renderPost?.post && (
          <Post postData={renderPost?.post} onPostPage={true} />
        )}
      </div>
      {/* Coments */}
      <div className="Posts_Container postPage marginHeader comment">
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
