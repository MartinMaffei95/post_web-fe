import {
  GET_INIT_POSTS_SUCCESS,
  GET_INIT_POSTS_REQUEST,
  GET_INIT_POSTS_FAILURE,
  CREATE_COMMENT_IN_POST,
  WRITING_COMMENT_IN_POST,
  GET_MY_POSTS,
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
export const makeComment = (postData, profileData) => ({
  type: CREATE_COMMENT_IN_POST,
  payload: { postData, profileData },
});
export const handleComment = (state) => ({
  type: WRITING_COMMENT_IN_POST,
  payload: state,
});

export const getMyPosts = (data) => ({
  type: GET_MY_POSTS,
  payload: data,
});

//Get all posts
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

//Get my posts
export const getPostsWithProfile = (profileID) => (dispatch) => {
  dispatch(postRequest());

  axios(`${process.env.REACT_APP_URI}profile/${profileID}/posts`, {
    method: 'GET',
    headers: {
      contentType: 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  })
    .then((res) => dispatch(getMyPosts(res.data.post)))
    .catch((err) => {
      dispatch(postFailure(err));
    });
};

export const getPostFromHome = (postData, profile) => (dispatch) => {
  dispatch(makeComment(postData, profile));
};

export const handleWriteComment = (state) => (dispatch) => {
  dispatch(handleComment(state));
};
