import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useFetchPost from '../Hooks/useFetchPost';
import Post from './Post/Post';

import './style.ComposePost.css';
const ComposePost = ({ postID, isFavPage }) => {
  const [favoritePost, setFavoritePost] = useState('');
  const { post, loading, error } = useFetchPost(postID);

  useEffect(() => {
    setFavoritePost(post?.post);
    console.log(post);
  }, [loading]);

  if (post !== null)
    return (
      <div className={`Post postBox ${!isFavPage ? 'composeFavorites' : ''}`}>
        {isFavPage ? (
          <>
            <Post postData={favoritePost} />
          </>
        ) : (
          <>
            <Post postData={favoritePost} />
          </>
        )}
      </div>
    );
};

export default ComposePost;
