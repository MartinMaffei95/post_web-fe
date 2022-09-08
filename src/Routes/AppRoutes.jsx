import React from 'react';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Profile from '../pages/Profile/Profile';
import PostBoard from '../Components/PostBoard/PostBoard';
import PostPage from '../pages/PostPage/PostPage';
import Styles from '../pages/Styles/Styles';
const AppRoutes = () => {
  const navigate = useNavigate();
  const RequireAuth = ({ children }) => {
    if (!localStorage.getItem('token')) {
      return <Navigate to="/login" replace={true} />;
    }
    return children;
  };
  return (
    <Routes>
      {/* ## Home page ## */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      {/* ## Profile pages - DINAMIC with useParams() ## */}
      <Route path="/profile">
        <Route
          path=":userId"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Route>
      {/* ## Post pages - DINAMIC with useParams() ## */}
      <Route path="/post">
        <Route
          path=":postId"
          element={
            <RequireAuth>
              <PostPage />
            </RequireAuth>
          }
        />
      </Route>
      {/* ## Register page ## */}
      <Route path="/register" element={<Register />}></Route>
      {/* ## Login page ## */}
      <Route path="/login" element={<Login />}></Route>
      {/* ## Styles page ## */}
      <Route path="/styles" element={<Styles />}></Route>
    </Routes>
  );
};

export default AppRoutes;
