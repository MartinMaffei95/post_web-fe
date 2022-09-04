import {
  GET_INIT_PROFILE_SUCCESS,
  GET_INIT_PROFILE_REQUEST,
  GET_INIT_PROFILE_FAILURE,
} from './actions';
import axios from 'axios';

export const profileRequest = () => ({ type: GET_INIT_PROFILE_REQUEST });
export const profileSucces = (data) => ({
  type: GET_INIT_PROFILE_SUCCESS,
  payload: data,
});
export const profileFailure = (error) => ({
  type: GET_INIT_PROFILE_FAILURE,
  payload: error,
});

export const getProfileInformation = (profileID) => (dispatch) => {
  dispatch(profileRequest());

  axios(`${process.env.REACT_APP_URI}profile/${profileID}`, {
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => dispatch(profileSucces(res.data.profileData)))
    .catch((err) => {
      dispatch(profileFailure(err));
    });
};
