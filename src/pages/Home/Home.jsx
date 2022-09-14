import React from 'react';

import PostBoard from '../../Components/PostBoard/PostBoard';
import MakePost from '../../Components/MakePost/MakePost';
import Header from '../../Components/Header/Header';
import NewPostBtn from '../../Molecules/NewPostBtn/NewPostBtn';
import { Helmet } from 'react-helmet';

const Home = () => {
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

export default Home;
