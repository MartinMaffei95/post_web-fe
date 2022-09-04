import { useState, useEffect } from 'react';
import axios from 'axios';
const useFetchProfile = (profileID) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios(`${process.env.REACT_APP_URI}profile/${profileID}`, {
      method: 'GET',
      headers: {
        contentType: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => setProfile(res.data))
      .catch((err) => {
        setError(err);
      });
  }, []);
  return { profile, loading, error };
};

export default useFetchProfile;
