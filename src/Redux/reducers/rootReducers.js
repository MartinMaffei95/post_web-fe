import { combineReducers } from 'redux';
import { postReducer } from './postReducers/postsReducer';
import { profileReducer } from './profileReducers/profileReducer';

const rootReducer = combineReducers({
  postReducer,
  profileReducer,
});

export default rootReducer;
