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
import { useResize } from '../../Hooks/useResize';
import ComposeHeader from '../../Components/ComposeHeader/ComposeHeader';
import LateralMenu from '../../Components/LateralMenu/LateralMenu';
import FavoritesBoard from '../../Components/FavoritesBoard/FavoritesBoard';

import { Modal } from '@mui/material';
import SectionModal, {
  sectionNames,
} from '../../Components/SectionModal/SectionModal';

const PostPage = ({
  handleWriteComment,
  handleModal,
  modalPostOpen,
  actualPost,
}) => {
  let { postId } = useParams();
  const { post } = useFetchPost(postId);
  const [renderPost, setRenderPost] = useState();
  const { isPhone } = useResize();

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

      {isPhone ? (
        <>
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
      ) : (
        <div className="bigView PostPage">
          <Modal
            className={`modalStyle_Container`}
            onClose={() => {
              handleModal();
            }}
            open={modalPostOpen}
            children={
              <SectionModal
                section={sectionNames.MAKE_COMMENT}
                className={`modalStyle`}
                postInfo={actualPost?.postData}
              />
            }
          />
          <LateralMenu />
          <div className="PostView">
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
          </div>
          <FavoritesBoard />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  writtingComment: state.postReducer.writtingComment,
  modalPostOpen: state.postReducer.writtingComment,
  actualPost: state.postReducer.actualPost,
});
const mapDispatchToProps = (dispatch) => ({
  handleWrittingComment(state) {
    dispatch(handleWriteComment(state));
  },
  handleModal() {
    dispatch(handleWriteComment(false));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
