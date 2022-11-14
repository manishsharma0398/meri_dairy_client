import axios from "axios";

import { SET_CURRENT_USER, SET_CURRENT_USER_ERROR } from "./user-action-types";

export const setCurrentUser = (userData) => ({
  type: SET_CURRENT_USER,
  payload: userData,
});

export const setCurrentUserError = (error) => {
  console.log(error);
  return {
    type: SET_CURRENT_USER_ERROR,
    payload: error,
  };
};

export const loginUser = async (loginData) => {
  const { emailOrPhone, password } = loginData;

  try {
    const userData = await axios.post("/auth/login", {
      password,
      email: emailOrPhone,
    });
    return { ...userData.data, error: false };
  } catch (err) {
    return { error: true, data: err.response.data.message };
  }
};

export const registerUser = async (registrationData) => {
  try {
    const userData = await axios.post("/auth/register", registrationData);
    return { ...userData.data, error: false };
  } catch (err) {
    return { error: true, data: err.response.data.message };
  }
};

export const logOutUser = async () => {
  try {
    await axios.post("/auth/logout");
  } catch (err) {
    console.log(err);
    // return { error: true, data: err.response.data.message };
  }
};
