import { Provider } from 'react-redux';
import store from './Redux/store';
import AppRoutes from './Routes/AppRoutes';
import {
  getInitPosts,
  getPostsWithProfile,
} from './Redux/actions/postsActions';
import { getMyProfileData } from './Redux/actions/profilesActions';
store.dispatch(getInitPosts());
getPostsWithProfile(localStorage.getItem('userID')) &&
  store.dispatch(getPostsWithProfile(localStorage.getItem('userID')));

if (localStorage.getItem('userID') || localStorage.getItem('token')) {
  store.dispatch(
    getMyProfileData(
      localStorage.getItem('userID'),
      localStorage.getItem('token')
    )
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
