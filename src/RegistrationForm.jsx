import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { registerUser } from './store';

function RegistrationForm() {

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


   const submitLogics = (data) => {
    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        alert("Registration success");
        reset();
      })
      .catch((err) => {
        // error (no alert)
        console.error("Registration failed:", err);
      });
  };

  return (
    <>
      <h2>Create Account</h2>
      <form onSubmit = {handleSubmit(submitLogics)}>
      <input placeholder="Full Name" {...register("username", 
                { required: "Name is required" })} />
        {errors.name && <span>{errors.name.message}</span>} <br />

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>} <br />

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters required" },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>} <br />

        <input
          placeholder="Phone Number"
          {...register("phone", {
            required: "Phone is required",
            pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10-digit number" },
          })}
        />
        {errors.phone && <span>{errors.phone.message}</span>} <br />

        <textarea
          placeholder="Full Address"
          rows="3"
          {...register("address", {
            required: "Address is required",
            minLength: { value: 5, message: "Min 5 characters" },
          })}
        />
        {errors.address && <span>{errors.address.message}</span>} <br />

        <button type='submit'>
          Register
        </button>

        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </form>

    </>
  )
}

export default RegistrationForm;
