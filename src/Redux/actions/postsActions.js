import {
  GET_INIT_POSTS_SUCCESS,
  GET_INIT_POSTS_REQUEST,
  GET_INIT_POSTS_FAILURE,
} from './actions';
import axios from 'axios';

export const postRequest = () => ({ type: GET_INIT_POSTS_REQUEST });
export const postSucces = (data) => ({
  type: GET_INIT_POSTS_SUCCESS,
  payload: data,
});
export const postFailure = (error) => ({
  type: GET_INIT_POSTS_FAILURE,
  payload: error,
});

export const getInitPosts = () => (dispatch) => {
  dispatch(postRequest());

  axios(`${process.env.REACT_APP_URI}post/all`, {
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => dispatch(postSucces(res.data.post)))
    .catch((err) => {
      dispatch(postFailure(err));
    });
};

export const getPostsWithProfile = (profileID) => (dispatch) => {
  dispatch(postRequest());

  axios(`${process.env.REACT_APP_URI}profile/${profileID}/posts`, {
    method: 'GET',
    headers: {
      contentType: 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => dispatch(postSucces(res.data.post)))
    .catch((err) => {
      dispatch(postFailure(err));
    });
};
