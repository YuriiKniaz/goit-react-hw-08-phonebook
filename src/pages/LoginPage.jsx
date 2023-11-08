import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { logInThunk } from 'redux/authorizationSlice';
import login from './LoginPage.module.css';
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(logInThunk(data));
    reset();
  };

  return (
    <form className={login.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={login.formLabel}>
        <span className={login.fromSpan}>Email:</span>
        <input
          className={login.fromInput}
          {...register('email', { required: true })}
          type="email"
        />
        {errors.email && (
          <span className={login.fromInputError}>This field is required</span>
        )}
      </label>
      <label className={login.formLabel}>
        <span className={login.fromSpan}>Password:</span>
        <input
          className={login.fromInput}
          {...register('password', { required: true })}
          type="password"
        />
        {errors.password && (
          <span className={login.fromInputError}>This field is required</span>
        )}
      </label>

      <button className={login.fromBtn} type="submit">
        Sign In
      </button>
    </form>
  );
};

export default LoginPage;
