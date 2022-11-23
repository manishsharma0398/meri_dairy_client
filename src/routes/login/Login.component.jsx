import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  setCurrentUser,
  loginUser,
  setCurrentUserError,
} from "../../store/user/user-action-creator";
import { inputError } from "../../utils/getError";
import { setFormErrors } from "../../store/ui/ui-action-creator";

import InputForm from "../../components/input-form/InputForm.component";
import Form from "../../components/form/Form.component";
import AuthHelper from "../../components/auth-helper/AuthHelper.component";

const Login = () => {
  const [loginFormFields, setLoginFormFields] = useState({
    emailOrPhone: "",
    password: "",
  });

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

  useEffect(() => {
    dispatch(setFormErrors([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      formHeading="Login"
      onSubmitFormHandler={loginFormHandler}
      btnText="Login"
      children={
        <Fragment>
          <InputForm
            id="emailOrPhone"
            label="Email or Phone"
            name="emailOrPhone"
            inputValue={emailOrPhone}
            onChangeHandler={onChangeHandler}
            placeholder="Email or Phone No"
            inputErr={inputError("emailOrPhone")}
            // required={true}
          />
          <InputForm
            id="password"
            label="Password"
            name="password"
            inputValue={password}
            onChangeHandler={onChangeHandler}
            placeholder="Password"
            type="password"
            inputErr={inputError("password")}
            // required={true}
          />
        </Fragment>
      }
      helper={
        <AuthHelper
          helperText="Don't have an account?"
          link="/register"
          linkText="Register"
        />
      }
    />
  );
};

export default Login;
