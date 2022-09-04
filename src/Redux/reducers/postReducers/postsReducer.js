import {
  GET_INIT_POSTS_REQUEST,
  GET_INIT_POSTS_SUCCESS,
  GET_INIT_POSTS_FAILURE,
} from '../../actions/actions';

const initialStore = {
  loading: false,
  posts: [],
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

    default:
      return state;
  }
};
