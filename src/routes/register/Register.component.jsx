import React from "react";
import { Link } from "react-router-dom";

import "./register.styles.scss";

const Register = () => {
  const registerFormHandler = (e) => {
    e.preventDefault();
    console.log("form submitted successfully");
  };

  return (
    <div className="register">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={registerFormHandler}>
        <label htmlFor="full_name">Full Name</label>
        <input type="text" id="full_name" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <label htmlFor="conf_password">Confirm Password</label>
        <input type="password" id="conf_password" />
        <label htmlFor="phone">Phone</label>
        <input type="number" id="phone" />
        <label htmlFor="farm_name">Farm Name</label>
        <input type="text" id="farm_name" />
        <label htmlFor="farm_address">Farm Address</label>
        <input type="text" id="farm_address" />
        <button className="btn" type="submit">
          Register
        </button>
      </form>
      <span>
        <Link to="/login">Already have an account ?</Link>
      </span>
    </div>
  );
};

export default Register;
