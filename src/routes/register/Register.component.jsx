import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import InputForm from "../../components/input-form/InputForm.component";
import Button from "../../components/button/Button.component";

import "../Auth.styles.scss";

const Register = () => {
  const [error, setError] = useState(null);
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

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setRegistrationFormFields({ ...registrationFormFields, [name]: value });
  };

  const registerFormHandler = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      const { confirmPassword, ...userData } = registrationFormFields;

      const res = await axios.post("/auth/register", userData);

      console.table(res.data);
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);

      console.log(err.response);
    }
  };

  return (
    <div className="auth">
      <h2 className="auth-title">Register</h2>
      <form className="auth-form" onSubmit={registerFormHandler}>
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
        {error && <span>{error}</span>}
        <Button text="Register" type="submit" />
        <span className="auth-helper">
          <Link to="/login">Already have an account ?</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
