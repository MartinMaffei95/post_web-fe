import { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import PostBoard from '../../Components/PostBoard/PostBoard';
import { useParams } from 'react-router-dom';
import useFetchProfile from '../../Hooks/useFetchProfile';
import InformationPanel from '../../Components/InformationPanel/InformationPanel';

// REDUX
import { connect } from 'react-redux';
import { getPostsWithProfile } from '../../Redux/actions/postsActions';
import { Helmet } from 'react-helmet';
import NewPostBtn from '../../Molecules/NewPostBtn/NewPostBtn';
import { useResize } from '../../Hooks/useResize';
import LateralMenu from '../../Components/LateralMenu/LateralMenu';

// TOASTIFY
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = ({ myPosts, fetchUserProfile, myUser }) => {
  let { userId } = useParams();
  const { profile } = useFetchProfile(userId);
  const { isPhone } = useResize();
  useEffect(() => {}, [myPosts]);
  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>PostWeb | {`Perfil de ${profile?.profileData?.username}`}</title>
      </Helmet>

      {isPhone ? (
        <>
          <Header /> {/* ## position:FIXED */}
          <InformationPanel profileData={profile?.profileData} />
          <PostBoard postFromUser={true} geterPostFromUser={profile?.posts} />
          <NewPostBtn /> {/* ## position:FIXED */}
        </>
      ) : (
        <div className="bigView ProfilePage">
          <LateralMenu userData={myUser} />
          <div className="ProfileContainer">
            <InformationPanel profileData={profile?.profileData} />
            <PostBoard postFromUser={true} geterPostFromUser={profile?.posts} />
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.postReducer.posts,
  myPosts: state.postReducer.myPosts,
  myUser: state.profileReducer.myProfileInformation,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile(profileID, token) {
    dispatch(getPostsWithProfile(profileID, token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
