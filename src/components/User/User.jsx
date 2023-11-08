import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUserData } from 'redux/authSelectors';
import { logOutThunk } from 'redux/authorizationSlice';
import usr from './User.module.css';
const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUserData);

  const onLogOut = () => {
    dispatch(logOutThunk());
  };

  return (
    <div className={usr.userWrap}>
      <h3 className={usr.userTitle}>Welcome, {user.name}</h3>
      <button className={usr.userBtn} onClick={onLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default User;
