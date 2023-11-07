import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthSignedIn } from 'redux/authSelectors';
import { NavLink } from 'react-router-dom';
import User from 'components/User/User';
const Navigation = () => {
  const signedIn = useSelector(selectAuthSignedIn);
  console.log(signedIn);

  return (
    <header>
      <nav>
        <div>
          <NavLink to="/">HomePage</NavLink>
        </div>
        {signedIn ? (
          <div>
            <NavLink to="/contacts">Contacts</NavLink>
            <User />
          </div>
        ) : (
          <ul>
            <li>
              <NavLink to="/register">SignUp</NavLink>
            </li>
            <li>
              <NavLink to="/login">LogIn</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
