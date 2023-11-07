import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthSignedIn } from 'redux/authSelectors';
import { Navigate } from 'react-router-dom';
const RestrictedRoute = ({ children, redirectTo = '/contacts' }) => {
  const signedIn = useSelector(selectAuthSignedIn);
  return signedIn ? <Navigate to={redirectTo} replace /> : children;
};

export default RestrictedRoute;
