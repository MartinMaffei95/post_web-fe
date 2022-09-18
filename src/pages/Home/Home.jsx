import React, { useEffect } from 'react';
import PostBoard from '../../Components/PostBoard/PostBoard';
import Header from '../../Components/Header/Header';
import NewPostBtn from '../../Molecules/NewPostBtn/NewPostBtn';
import { Helmet } from 'react-helmet';

// REDUX
import { connect } from 'react-redux';
import { getInitPosts } from '../../Redux/actions/postsActions';

const Home = ({ reloadHomePage }) => {
  useEffect(() => {
    reloadHomePage();
  }, []);
  return (
    <>
      <Helmet>
        <title>PostWeb | Home</title>
      </Helmet>
      <Header /> {/* ## position:FIXED */}
      <PostBoard />
      <NewPostBtn /> {/* ## position:FIXED */}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  reloadHomePage() {
    dispatch(getInitPosts());
  },
});
const mapStateToProps = (state) => ({
  // myUser: state.profileReducer.myProfileInformation,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
