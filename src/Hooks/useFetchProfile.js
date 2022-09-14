import { useState, useEffect } from 'react';
import axios from 'axios';
const useFetchProfile = (profileID) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProfile = async (profileID) => {
    if (profileID) {
      setLoading(true);
      await axios(`${process.env.REACT_APP_URI}profile/${profileID}`, {
        method: 'GET',
        headers: {
          contentType: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then((res) => {
          setProfile(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchProfile(profileID);
  }, [profileID]);
  return { profile, loading, error };
};

export default useFetchProfile;
