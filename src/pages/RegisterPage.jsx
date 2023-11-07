import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { signUpThunk } from 'redux/authorizationSlice';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <span>Email:</span>
        <input {...register('email', { required: true })} type="email" />
        {errors.email && <span>This field is required</span>}
      </label>
      <label>
        <span>Name:</span>
        <input {...register('name', { required: true })} type="text" />
        {errors.name && <span>This field is required</span>}
      </label>
      <label>
        <span>Password:</span>
        <input {...register('password', { required: true })} type="password" />
        {errors.password && <span>This field is required</span>}
      </label>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default RegisterPage;
