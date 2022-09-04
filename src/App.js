import { Provider } from 'react-redux';
import store from './Redux/store';
import AppRoutes from './Routes/AppRoutes';
import { getInitPosts } from './Redux/actions/postsActions';

store.dispatch(getInitPosts());

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
