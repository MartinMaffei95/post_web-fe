import {
  GET_INIT_PROFILE_SUCCESS,
  GET_INIT_PROFILE_REQUEST,
  GET_INIT_PROFILE_FAILURE,
} from '../../actions/actions';

const initialStore = {
  loading: false,
  // profileInformation: [],
  profileSelectedInfo: [],
  posts: [],
  error: '',
};

export const profileReducer = (state = initialStore, action) => {
  switch (action.type) {
    case GET_INIT_PROFILE_REQUEST: //## GET on server initiated, now web is 'Loading...'
      return {
        ...state,
        loading: true,
      };
    case GET_INIT_PROFILE_SUCCESS: //## GET as a good request
      return {
        loading: false, //## web is not loading
        errors: '', //## dont have errors
        profileSelectedInfo: action.payload, //## saving profile on this array
      };
    case GET_INIT_PROFILE_FAILURE: //## GET as a bad request :(
      return {
        loading: false, //## web is not loading
        errors: action.payload, //## saving errors on this array
        userInformation: [], //## dont have profile so its a empty array
      };

    default:
      return state;
  }
};
