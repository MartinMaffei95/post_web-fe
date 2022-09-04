import React from 'react';

import PostBoard from '../../Components/PostBoard/PostBoard';
import MakePost from '../../Components/MakePost/MakePost';
import Header from '../../Components/Header/Header';

const Home = () => {
  return (
    <>
      <Header />
      <MakePost />
      <PostBoard />
    </>
  );
};

export default Home;
