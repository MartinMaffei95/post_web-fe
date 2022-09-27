import React, { useEffect, useState } from 'react';
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
import SectionModal from '../../Components/SectionModal/SectionModal';

import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
// import { useEffect } from 'react';

const Home = ({
  reloadHomePage,
  myUser,
  modalPostOpen,
  handleModal,
  actualPost,
  modalAction,
}) => {
  const { isPhone } = useResize();

  const [isloading, setIsLoading] = useState(false);

  const postLoading = useSelector((state) => state.postReducer.loading);
  const profileLoading = useSelector((state) => state.profileReducer.loading);

  useEffect(() => {
    if (postLoading || profileLoading) return setIsLoading(true);
    if (!postLoading && !profileLoading) return setIsLoading(false);
  }, [postLoading, profileLoading]);

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
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isloading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Header /> {/* ## position:FIXED */}
          <PostBoard />
          <NewPostBtn /> {/* ## position:FIXED */}
        </>
      ) : (
        <div className="bigView">
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isloading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
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
                section={modalAction}
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
  modalAction: state.postReducer.modalAction,
  actualPost: state.postReducer.actualPost,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
