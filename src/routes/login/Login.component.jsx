import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setCurrentUser } from "../../store/user/user-action-creator";

import InputForm from "../../components/input-form/InputForm.component";
import Button from "../../components/button/Button.component";

import "../Auth.styles.scss";

const Login = () => {
  const [loginFormFields, setLoginFormFields] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { emailOrPhone, password } = loginFormFields;

  const onChangeHandler = (e) => {
    setLoginFormFields({ ...loginFormFields, [e.target.name]: e.target.value });
  };

  const loginFormHandler = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      const res = await axios.post("/auth/login", {
        password,
        email: emailOrPhone,
      });
      console.table(res.data);
      dispatch(setCurrentUser(res.data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response.data.message);

      console.log(err.response);
    }
  };

  return (
    <div className="auth">
      <h2 className="auth-title">Login</h2>
      <form className="auth-form" onSubmit={loginFormHandler}>
        <InputForm
          id="emailOrPhone"
          label="Email or Phone"
          name="emailOrPhone"
          inputValue={emailOrPhone}
          onChangeHandler={onChangeHandler}
          placeholder="Email or Phone No"
        />
        <InputForm
          id="password"
          label="Password"
          name="password"
          inputValue={password}
          onChangeHandler={onChangeHandler}
          placeholder="Password"
          type="password"
        />

        {error && <span>{error}</span>}

        <Button text="Login" type="submit" />
        <span className="auth-helper">
          <Link to="/register">Don't have an account ?</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
