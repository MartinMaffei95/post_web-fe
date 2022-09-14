import {
  GET_INIT_POSTS_REQUEST,
  GET_INIT_POSTS_SUCCESS,
  GET_INIT_POSTS_FAILURE,
  CREATE_COMMENT_IN_POST,
  WRITING_COMMENT_IN_POST,
  GET_MY_POSTS,
} from '../../actions/actions';

const initialStore = {
  loading: false,
  posts: [],
  myPosts: {},
  actualPost: {},
  writtingComment: false,
  error: '',
};

export const postReducer = (state = initialStore, action) => {
  switch (action.type) {
    case GET_INIT_POSTS_REQUEST: //## GET on server initiated, now web is 'Loading...'
      return {
        ...state,
        loading: true,
      };
    case GET_INIT_POSTS_SUCCESS: //## GET as a good request
      return {
        loading: false, //## web is not loading
        errors: '', //## dont have errors
        posts: action.payload, //## saving posts on this array
      };
    case GET_INIT_POSTS_FAILURE: //## GET as a bad request :(
      return {
        loading: false, //## web is not loading
        errors: action.payload, //## saving errors on this array
        posts: [], //## dont have posts so its a empty array
      };
    case GET_MY_POSTS: //## GET as a bad request :(
      return {
        ...state,
        loading: false, //## web is not loading
        errors: '', //## saving errors on this array
        myPosts: action.payload, //## dont have posts so its a empty array
      };

    case CREATE_COMMENT_IN_POST:
      return {
        ...state,
        actualPost: action.payload, //## hosting post data
      };
    case WRITING_COMMENT_IN_POST:
      console.log(action.payload);
      return {
        ...state,
        writtingComment: action.payload, //## hosting post data
      };

    default:
      return state;
  }
};
