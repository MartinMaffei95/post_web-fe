import React from 'react';

import PostBoard from '../../Components/PostBoard/PostBoard';
import MakePost from '../../Components/MakePost/MakePost';
import Header from '../../Components/Header/Header';
import NewPostBtn from '../../Molecules/NewPostBtn/NewPostBtn';

const Home = () => {
  return (
    <>
      <Header /> {/* ## position:FIXED */}
      <PostBoard />
      <NewPostBtn /> {/* ## position:FIXED */}
    </>
  );
};

export default Home;
