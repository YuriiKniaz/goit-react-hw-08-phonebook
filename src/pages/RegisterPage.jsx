import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { signUpThunk } from 'redux/authorizationSlice';
import reg from './RegisterPage.module.css';
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(signUpThunk(data));
    reset();
  };

  return (
    <form className={reg.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={reg.formLabel}>
        <span className={reg.fromSpan}>Email:</span>
        <input
          className={reg.fromInput}
          {...register('email', { required: true })}
          type="email"
        />
        {errors.email && (
          <span className={reg.fromInputError}>This field is required</span>
        )}
      </label>
      <label className={reg.formLabel}>
        <span className={reg.fromSpan}>Name:</span>
        <input
          className={reg.fromInput}
          {...register('name', { required: true })}
          type="text"
        />
        {errors.name && (
          <span className={reg.fromInputError}>This field is required</span>
        )}
      </label>
      <label className={reg.formLabel}>
        <span className={reg.fromSpan}>Password:</span>
        <input
          className={reg.fromInput}
          {...register('password', { required: true })}
          type="password"
        />
        {errors.password && (
          <span className={reg.fromInputError}>This field is required</span>
        )}
      </label>

      <button className={reg.fromBtn} type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default RegisterPage;
