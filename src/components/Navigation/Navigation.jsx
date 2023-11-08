import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthSignedIn } from 'redux/authSelectors';
import { NavLink } from 'react-router-dom';
import User from 'components/User/User';
import nav from './Navigation.module.css';
const Navigation = () => {
  const signedIn = useSelector(selectAuthSignedIn);

  return (
    <header className={nav.header}>
      <nav className={nav.navigation}>
        <div className={nav.homePageWrap}>
          <NavLink className={nav.homePage} to="/">
            Home Page
          </NavLink>
        </div>
        {signedIn ? (
          <div className={nav.contactsWrap}>
            <NavLink className={nav.contacts} to="/contacts">
              Contacts
            </NavLink>
            <User />
          </div>
        ) : (
          <ul className={nav.navList}>
            <li className={nav.navListItem}>
              <NavLink className={nav.signUp} to="/register">
                Sign Up
              </NavLink>
            </li>
            <li className={nav.navListItem}>
              <NavLink className={nav.logIn} to="/login">
                Log In
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
