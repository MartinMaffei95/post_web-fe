import { useState, useEffect } from 'react';
import axios from 'axios';
const useFetchPost = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPost = async () => {
    setLoading(true);
    await axios(`${process.env.REACT_APP_URI}post/${postId}`, {
      method: 'GET',
      headers: {
        contentType: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        setLoading(false);
        setPost(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return { post, loading, error };
};

export default useFetchPost;
