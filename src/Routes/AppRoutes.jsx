import React from 'react';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Profile from '../pages/Profile/Profile';
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
        {/* ## My Profile page ## */}
        <Route
          path="me"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path=":userId"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Route>
      {/* ## Register page ## */}
      <Route path="/register" element={<Register />}></Route>
      {/* ## Login page ## */}
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default AppRoutes;
