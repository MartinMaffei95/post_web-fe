import React, { useEffect } from 'react';
import PostBoard from '../../Components/PostBoard/PostBoard';
import Header from '../../Components/Header/Header';
import NewPostBtn from '../../Molecules/NewPostBtn/NewPostBtn';
import { Helmet } from 'react-helmet';

// REDUX
import { connect } from 'react-redux';
import { getInitPosts } from '../../Redux/actions/postsActions';

// is phone
import { useResize } from '../../Hooks/useResize';
import MakePost from '../../Components/MakePost/MakePost';
import LateralMenu from '../../Components/LateralMenu/LateralMenu';
const Home = ({ reloadHomePage, myUser }) => {
  const { isPhone } = useResize();
  useEffect(() => {
    reloadHomePage();
    console.log(isPhone);
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
          <MakePost />
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
});
const mapStateToProps = (state) => ({
  myUser: state.profileReducer.myProfileInformation,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
