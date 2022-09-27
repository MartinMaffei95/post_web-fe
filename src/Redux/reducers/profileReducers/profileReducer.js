import {
  GET_INIT_PROFILE_SUCCESS,
  GET_INIT_PROFILE_REQUEST,
  GET_INIT_PROFILE_FAILURE,
  GET_MY_PROFILE,
  LOADING,
} from '../../actions/actions';

const initialStore = {
  loading: false,
  myProfileInformation: {},
  profileSelectedInfo: [],
  posts: [],
  error: '',
};

export const profileReducer = (state = initialStore, action) => {
  switch (action.type) {
    case LOADING: //## APP IS LOADING - THIS ACTION ONLY PUT LOADING TREO OR FALSE
      return {
        ...state,
        loading: action.payload,
      };
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
        ...state,
        loading: false, //## web is not loading
        errors: action.payload, //## saving errors on this array
        userInformation: [], //## dont have profile so its a empty array
      };
    case GET_MY_PROFILE:
      return {
        ...state,
        loading: false, //## web is not loading
        errors: '', //## dont have errors
        myProfileInformation: action.payload, //## saving profile on this array
      };

    default:
      return state;
  }
};
