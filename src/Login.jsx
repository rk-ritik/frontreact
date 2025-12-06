// import React, { useRef, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "./store";
// import { toast } from "react-toastify";

// function Login() {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const dispatch = useDispatch();

//   const { user, error,loading } = useSelector((state) => state.login);
  
//   console.log(user);
//   console.log(error);
//   console.log(loading);

//   const handleLogin = (e) => {
//     console.log("submit button Clicked...");

//     e.preventDefault();

//     const userData = {
//       email: emailRef.current.value.trim(),
//       password: passwordRef.current.value.trim(),
//     };
//     console.log(userData);

//     dispatch(loginUser(userData));
//   };

//   useEffect(() => {
    
//     console.log(user);

//     if (user) {
//       toast.success("Login successful!");
//     }
//     if (error) {
//       toast.error(error);
//     }
//   }, [user, error]);

//   return (
//     <form onSubmit={handleLogin}>
//       <input ref={emailRef} placeholder="Email" />
//       <input ref={passwordRef} type="password" placeholder="Password" />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default Login;



import React, { use } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "./store";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate(); 
  // read login state
  // const { loading, error, user } = useSelector((state) => state.login);
  
  const { user, token, loading, error } = useSelector((state) => state.login);

  console.log(loading);
  console.log(error);
  console.log(user);
  console.log(token);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitLogin = (data) => {
  dispatch(loginUser(data))
    .unwrap()
    .then((res) => {
      toast.success("Login Successful 🎉", {
        position: "top-right",
        autoClose: 2000,
      });

      console.log("Full Login Response:", res);   // <-- HERE
      console.log("User Data:", res.message);        // <-- Extract user
      console.log("Token:", res.token);           // <-- Extract token

      reset();
      navigate("/veg");
    })
    .catch((err) => {
      console.error("Login failed:", err);

      toast.error(err || "Invalid Email or Password", {
        position: "top-right",
        autoClose: 2000,
      });
    });
};



  return (
    <div className="login-page">
      <div className="login-wrapper">
        <h2 className="text-warning text-center mb-3">Login</h2>

        <form onSubmit={handleSubmit(submitLogin)}>

          <input
            type="email"
            placeholder="Enter Email"
            className="login-input"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Enter Password"
            className="login-input"
            {...register("password", { required: "Password required" })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

          <button className="btn primary w-100 mt-2" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="error text-center mt-2">{error}</p>}

        {user && (
          <p className="text-success text-center mt-2">
            Welcome, {user.username}
          </p>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
