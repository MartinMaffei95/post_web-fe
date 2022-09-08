import { useState, useEffect } from 'react';
import axios from 'axios';
const useFetchPost = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios(`${process.env.REACT_APP_URI}post/${postId}`, {
      method: 'GET',
      headers: {
        contentType: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => setPost(res.data))
      .catch((err) => {
        setError(err);
      });
  }, []);
  return { post, loading, error };
};

export default useFetchPost;
