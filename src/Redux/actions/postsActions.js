import {
  GET_INIT_POSTS_SUCCESS,
  GET_INIT_POSTS_REQUEST,
  GET_INIT_POSTS_FAILURE,
  CREATE_COMMENT_IN_POST,
  WRITING_COMMENT_IN_POST,
  GET_MY_POSTS,
  LOADING,
} from './actions';
import axios from 'axios';
import { toast } from 'react-toastify';

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
export const handleComment = (state, action) => ({
  type: WRITING_COMMENT_IN_POST,
  payload: { state, action },
});

export const getMyPosts = (data) => ({
  type: GET_MY_POSTS,
  payload: data,
});

export const loading = (state) => ({
  type: LOADING,
  payload: state,
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

export const handleWriteComment = (state, action) => (dispatch) => {
  dispatch(handleComment(state, action));
};

export function makeToast(status, msg) {
  return function (dispatch) {
    switch (status) {
      case 'success':
        toast.success(msg, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        break;
      case 'error':
        toast.error(msg, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        break;
      case 'warning':
        toast.warning(msg, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        break;
      case 'information':
        toast.information(msg, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        break;

      default:
        break;
    }
  };
}
