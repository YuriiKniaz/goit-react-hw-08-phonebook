import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader } from './Loader/Loader';
import Navigation from './Navigation/Navigation';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { refreshThunk } from 'redux/authorizationSlice';
import { selectAuthIsLoading } from 'redux/authSelectors';
const HomePage = lazy(() => import('../pages/HomePage'));
const ContactsPage = lazy(() => import('../pages/ContactsPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectAuthIsLoading);
  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  const routes = [
    { path: '/', element: <HomePage /> },
    {
      path: '/register',
      element: (
        <RestrictedRoute>
          <RegisterPage />
        </RestrictedRoute>
      ),
    },
    {
      path: '/login',
      element: (
        <RestrictedRoute>
          <LoginPage />
        </RestrictedRoute>
      ),
    },
    {
      path: '/contacts',
      element: (
        <PrivateRoute>
          <ContactsPage />
        </PrivateRoute>
      ),
    },
  ];

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
    </>
  );
};
