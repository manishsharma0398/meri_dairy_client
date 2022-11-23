import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { registerUser } from "../../store/user/user-action-creator";
import { setFormErrors } from "../../store/ui/ui-action-creator";
import { inputError } from "../../utils/getError";

import InputForm from "../../components/input-form/InputForm.component";
import Form from "../../components/form/Form.component";
import AuthHelper from "../../components/auth-helper/AuthHelper.component";

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

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setRegistrationFormFields({ ...registrationFormFields, [name]: value });
  };

  const registerFormHandler = async (e) => {
    e.preventDefault();
    dispatch(setFormErrors([]));
    const { error, data } = await registerUser(registrationFormFields);
    if (!error) return navigate("/login");
    return dispatch(setFormErrors(data));
  };

  useEffect(() => {
    dispatch(setFormErrors([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      formHeading="Register"
      onSubmitFormHandler={registerFormHandler}
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
            inputErr={inputError("full_name")}
            // required={true}
          />
          <InputForm
            id="reg_password"
            name="password"
            label="Password"
            inputValue={password}
            onChangeHandler={onChangeHandler}
            placeholder="Password"
            type="password"
            inputErr={inputError("password")}
            // required={true}
          />
          <InputForm
            id="conf_password"
            name="confirmPassword"
            label="Confirm Password"
            inputValue={confirmPassword}
            onChangeHandler={onChangeHandler}
            placeholder="Password"
            type="password"
            inputErr={inputError("confirmPassword")}
            // required={true}
          />
          <InputForm
            id="email"
            name="email"
            label="Email"
            inputValue={email}
            onChangeHandler={onChangeHandler}
            placeholder="xyz@xyz.com"
            inputErr={inputError("email")}
            type="email"
          />
          <InputForm
            id="phone"
            name="phone"
            label="Mobile Number"
            inputValue={phone}
            onChangeHandler={onChangeHandler}
            placeholder="123456789"
            inputErr={inputError("phone")}
            type="phone"
          />
          <InputForm
            id="farm_name"
            name="farm_name"
            label="Farm Name"
            inputValue={farm_name}
            onChangeHandler={onChangeHandler}
            placeholder="Ex - Manish Farm"
            inputErr={inputError("farm_name")}
            // required={true}
          />
          <InputForm
            id="farm_address"
            name="farm_address"
            label="Farm Address"
            inputValue={farm_address}
            onChangeHandler={onChangeHandler}
            placeholder="Ex - Milan More, Siliguri"
            inputErr={inputError("farm_address")}
            // required={true}
          />
        </Fragment>
      }
      helper={
        <AuthHelper
          helperText="Already have an account?"
          link="/login"
          linkText="Login"
        />
      }
    />
  );
};

export default Register;
