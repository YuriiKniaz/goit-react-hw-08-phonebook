import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUserData } from 'redux/authSelectors';
import { logOutThunk } from 'redux/authorizationSlice';

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUserData);

  const onLogOut = () => {
    dispatch(logOutThunk());
  };

  return (
    <div>
      <h3>Welcome, {user.name}</h3>
      <button onClick={onLogOut}>Log Out</button>
    </div>
  );
};

export default User;
