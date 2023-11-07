import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthSignedIn } from 'redux/authSelectors';
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({ children, redirectTo = '/login' }) => {
  const signedIn = useSelector(selectAuthSignedIn);
  return signedIn ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
