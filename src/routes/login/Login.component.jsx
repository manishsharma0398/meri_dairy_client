import React from "react";
import { Link } from "react-router-dom";

import "./login.styles.scss";

const Login = () => {
  const loginFormHandler = (e) => {
    e.preventDefault();
    console.log("form submitted successfully");
  };

  return (
    <div className="register">
      <h2 className="register-title">Login</h2>
      <form className="register-form" onSubmit={loginFormHandler}>
        <label htmlFor="emailOrPhone">Email/Phone</label>
        <input type="text" id="emailOrPhone" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" />

        <button className="btn" type="submit">
          Login
        </button>
      </form>
      <span>
        <Link to="/register">Don't have an account ?</Link>
      </span>
    </div>
  );
};

export default Login;
