import React, { useEffect } from 'react';
import PostBoard from '../../Components/PostBoard/PostBoard';
import Header from '../../Components/Header/Header';
import NewPostBtn from '../../Molecules/NewPostBtn/NewPostBtn';
import { Helmet } from 'react-helmet';

// REDUX
import { connect } from 'react-redux';
import {
  makeToast,
  getPostFromHome,
  handleWriteComment,
  getInitPosts,
} from '../../Redux/actions/postsActions';

import { Modal } from '@mui/material';

// is phone
import { useResize } from '../../Hooks/useResize';
import MakePost from '../../Components/MakePost/MakePost';
import LateralMenu from '../../Components/LateralMenu/LateralMenu';
import FavoritesBoard from '../../Components/FavoritesBoard/FavoritesBoard';
import SectionModal, {
  sectionNames,
} from '../../Components/SectionModal/SectionModal';
const Home = ({
  reloadHomePage,
  myUser,
  modalPostOpen,
  handleModal,
  actualPost,
}) => {
  const { isPhone } = useResize();
  useEffect(() => {
    reloadHomePage();
  }, [isPhone]);

  return (
    <>
      <Helmet>
        <title>PostWeb | Home</title>
      </Helmet>
      {isPhone ? (
        <>
          <Header /> {/* ## position:FIXED */}
          <PostBoard />
          <NewPostBtn /> {/* ## position:FIXED */}
        </>
      ) : (
        <div className="bigView">
          <LateralMenu userData={myUser} />
          <FavoritesBoard />
          <MakePost />
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

          <PostBoard />
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  reloadHomePage() {
    dispatch(getInitPosts());
  },
  makingComment(postData, profile) {
    dispatch(getPostFromHome(postData, profile));
  },
  handleModal() {
    dispatch(handleWriteComment(false));
  },
});
const mapStateToProps = (state) => ({
  myUser: state.profileReducer.myProfileInformation,
  modalPostOpen: state.postReducer.writtingComment,
  actualPost: state.postReducer.actualPost,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
