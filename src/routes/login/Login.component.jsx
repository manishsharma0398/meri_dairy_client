import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  setCurrentUser,
  loginUser,
  setCurrentUserError,
} from "../../store/user/user-action-creator";

import InputForm from "../../components/input-form/InputForm.component";
import Button from "../../components/button/Button.component";

import "../Auth.styles.scss";

const Login = () => {
  const [loginFormFields, setLoginFormFields] = useState({
    emailOrPhone: "",
    password: "",
  });

  const { error, errorMsg } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { emailOrPhone, password } = loginFormFields;

  const onChangeHandler = (e) => {
    setLoginFormFields({ ...loginFormFields, [e.target.name]: e.target.value });
  };

  const loginFormHandler = async (e) => {
    e.preventDefault();

    dispatch(setCurrentUserError({ error: false, errorMsg: "" }));

    const userData = await loginUser(loginFormFields);
    const { data, error } = userData;

    if (error) return dispatch(setCurrentUserError({ error, errorMsg: data }));

    dispatch(setCurrentUser(data));
    return navigate("/animals");
  };

  return (
    <div className="auth">
      <h2 className="auth-title">Login</h2>
      <form className="auth-form" onSubmit={loginFormHandler}>
        {error && <span className="err-msg">{errorMsg}</span>}

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

        <Button text="Login" type="submit" />
        <span className="auth-helper">
          <Link to="/register">Don't have an account ?</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
