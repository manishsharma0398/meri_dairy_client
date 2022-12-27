import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMilkData, setMilkData } from "../../store/milk/milk-action-creator";
import {
  setAnimalDetails,
  getAllAnimals,
} from "../../store/animal/animal-action-creator";
import {
  getHealthData,
  setHealthData,
} from "../../store/health/health-action-creator";
import {
  getWorkerData,
  setWorkerData,
} from "../../store/worker/worker-action-creator";
import {
  getTransactionData,
  setTransactionData,
} from "../../store/transaction/transaction-action-creator";
import {
  getTreatmentData,
  setTreatmentData,
} from "../../store/treatment/treatment-action-creator";
import {
  getMatingData,
  setMatingData,
} from "../../store/mating/mating-action-creator";
import updateState from "../../utils/updateState";

import {
  setCurrentUser,
  loginUser,
  loginWithGoogle,
} from "../../store/user/user-action-creator";
import { setSpinnerHandler } from "../../store/ui/ui-action-creator";

import Spinner from "../../components/spinner/Spinner.component";
import InputForm from "../../components/input-form/InputForm.component";
import Form from "../../components/form/Form.component";
import AuthHelper from "../../components/auth-helper/AuthHelper.component";
import IconButton from "../../components/icon-button/IconButton.component";

const Login = () => {
  const initialLoginErrors = {
    email_error: "",
    password_error: "",
  };

  const [loginFormFields, setLoginFormFields] = useState({
    email: "",
    password: "",
  });

  const [loginErrors, setLoginErrors] = useState(initialLoginErrors);

  const dispatch = useDispatch();
  const { showFullBodySpinner } = useSelector((state) => state.UI);

  const { email, password } = loginFormFields;
  const { email_error, password_error } = loginErrors;

  const onChangeHandler = (e) => {
    setLoginFormFields({ ...loginFormFields, [e.target.name]: e.target.value });
  };

  const getAllAnimalDetails = async () => {
    const animalData = await getAllAnimals();
    const { data } = animalData;

    // setErr(null);
    // dispatch(setAnimalDetails(data));
    return data;
  };

  const getAllMilkRecords = async () => {
    const animalData = await getMilkData();
    const { data } = animalData;
    // setErr(null);
    // dispatch(setMilkData(data));
    return data;
  };

  const health = async () => {
    const { error, data } = await getHealthData();
    if (error) return;
    // dispatch(setHealthData(data));
    return data;
  };

  const getWorkers = async () => {
    const { error, data } = await getWorkerData();
    if (error) return;
    // dispatch(setWorkerData(data));
    return data;
  };

  const getTransactions = async () => {
    const { error, data } = await getTransactionData();
    if (error) return;
    // dispatch(setTransactionData(data));
    return data;
  };

  const getTreatment = async () => {
    const { error, data } = await getTreatmentData();
    if (error) return;
    // dispatch(setTreatmentData(data));
    return data;
  };

  const fetchMatingData = async () => {
    const { error, data } = await getMatingData();
    if (error) return;
    // dispatch(setMatingData(data));
    return data;
  };

  const fetchAllData = async () => {
    const animalsPromise = getAllAnimalDetails();
    const milkRecordsPromise = getAllMilkRecords();
    const healthRecordsPromise = health();
    const workersPromise = getWorkers();
    const transactionsPromise = getTransactions();
    const treatmentRecordsPromise = getTreatment();
    const matingDataPromise = fetchMatingData();

    const [
      animals,
      milkRecords,
      healthRecords,
      workers,
      transactions,
      treatmentRecords,
      matingRecords,
    ] = await Promise.all([
      animalsPromise,
      milkRecordsPromise,
      healthRecordsPromise,
      workersPromise,
      transactionsPromise,
      treatmentRecordsPromise,
      matingDataPromise,
    ]);

    dispatch(setAnimalDetails(animals));
    dispatch(setMilkData(milkRecords));
    dispatch(setHealthData(healthRecords));
    dispatch(setWorkerData(workers));
    dispatch(setTransactionData(transactions));
    dispatch(setTreatmentData(treatmentRecords));
    dispatch(setMatingData(matingRecords));
  };

  const loginFormHandler = async (e) => {
    e.preventDefault();

    setLoginErrors(initialLoginErrors);

    dispatch(setSpinnerHandler(true));

    const userData = await loginUser(loginFormFields);
    const { data, error } = userData;

    if (error) {
      setLoginErrors((state) => {
        return updateState({ state, data });
      });
      return dispatch(setSpinnerHandler(false));
    }

    await fetchAllData();
    return dispatch(setCurrentUser(data));
    // return navigate("/animals");
  };

  const handleLoginWithGoogle = (e) => {
    loginWithGoogle();
  };

  return (
    <Fragment>
      {showFullBodySpinner && <Spinner />}{" "}
      {!showFullBodySpinner && (
        <Form
          formHeading="Welcome Back"
          onSubmitFormHandler={loginFormHandler}
          btnText="Login"
          children={
            <Fragment>
              <InputForm
                id="email"
                label="Email or Phone"
                name="email"
                inputValue={email}
                onChangeHandler={onChangeHandler}
                placeholder="Email or Phone No"
                inputError={email_error}
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
                inputError={password_error}
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
          secondaryBtns={
            <Fragment>
              <IconButton
                onBtnClick={handleLoginWithGoogle}
                text="Login with Google"
                iconName="google"
              />
            </Fragment>
          }
        />
      )}
    </Fragment>
  );
};

export default Login;
