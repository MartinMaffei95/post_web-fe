import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
