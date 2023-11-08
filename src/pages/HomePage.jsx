import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthSignedIn } from 'redux/authSelectors';
import home from './HomePage.module.css';
const HomePage = () => {
  const signedIn = useSelector(selectAuthSignedIn);
  return (
    <div className={home.homeWrap}>
      <h1 className={home.title}>Welcome to your PhoneBook!</h1>

      {signedIn || (
        <ul className={home.homeList}>
          <li className={home.homeListItem}>
            <div className={home.homeListItemWrap}>
              <NavLink className={home.homeListLink} to="/register">
                SignUp
              </NavLink>
            </div>
          </li>
          <li className={home.homeListItem}>
            <div className={home.homeListItemWrap}>
              <NavLink className={home.homeListLink} to="/login">
                LogIn
              </NavLink>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default HomePage;
