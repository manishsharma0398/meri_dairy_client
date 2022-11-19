import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import InputForm from "../../components/input-form/InputForm.component";
import Form from "../../components/form/Form.component";
import {
  registerUser,
  setCurrentUserError,
} from "../../store/user/user-action-creator";

import "../Auth.styles.scss";

const Register = () => {
  const [registrationFormFields, setRegistrationFormFields] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    farm_name: "",
    farm_address: "",
  });

  const {
    full_name,
    email,
    password,
    confirmPassword,
    phone,
    farm_name,
    farm_address,
  } = registrationFormFields;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, errorMsg } = useSelector((state) => state.user);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setRegistrationFormFields({ ...registrationFormFields, [name]: value });
  };

  const registerFormHandler = async (e) => {
    e.preventDefault();

    const userData = await registerUser(registrationFormFields);

    const { data, error } = userData;

    if (error) return dispatch(setCurrentUserError({ error, errorMsg: data }));

    return navigate("/login");
  };

  return (
    <Form
      formHeading="Register"
      onSubmitFormHandler={registerFormHandler}
      error={error}
      errorMsg={errorMsg}
      btnText="Register"
      children={
        <Fragment>
          <InputForm
            id="full_name"
            label="Full Name"
            name="full_name"
            inputValue={full_name}
            onChangeHandler={onChangeHandler}
            placeholder="Full Name"
          />
          <InputForm
            id="reg_password"
            name="password"
            label="Password"
            inputValue={password}
            onChangeHandler={onChangeHandler}
            placeholder="Password"
            type="password"
          />
          <InputForm
            id="conf_password"
            name="confirmPassword"
            label="Confirm Password"
            inputValue={confirmPassword}
            onChangeHandler={onChangeHandler}
            placeholder="Password"
            type="password"
          />
          <InputForm
            id="email"
            name="email"
            label="Email"
            inputValue={email}
            onChangeHandler={onChangeHandler}
            placeholder="xyz@xyz.com"
            type="email"
          />
          <InputForm
            id="phone"
            name="phone"
            label="Mobile Number"
            inputValue={phone}
            onChangeHandler={onChangeHandler}
            placeholder="123456789"
            type="phone"
          />
          <InputForm
            id="farm_name"
            name="farm_name"
            label="Farm Name"
            inputValue={farm_name}
            onChangeHandler={onChangeHandler}
            placeholder="Ex - Manish Farm"
          />
          <InputForm
            id="farm_address"
            name="farm_address"
            label="Farm Address"
            inputValue={farm_address}
            onChangeHandler={onChangeHandler}
            placeholder="Ex - Milan More, Siliguri"
          />
        </Fragment>
      }
      helper={
        <span className="auth-helper">
          <Link to="/login">Already have an account ?</Link>
        </span>
      }
    />
  );
};

export default Register;
