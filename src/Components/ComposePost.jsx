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
  }, [loading]);

  return (
    <div className={`Post postBox ${!isFavPage ? 'composeFavorites' : ''}`}>
      {isFavPage ? (
        <>
          <Post postData={favoritePost} />
        </>
      ) : (
        <>
          <div>
            <span className="post_user">{favoritePost?.author?.username}</span>
          </div>
          <pre className="post_text">{favoritePost?.text}</pre>
        </>
      )}
    </div>
  );
};

export default ComposePost;
