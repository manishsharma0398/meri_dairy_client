import axios from "axios";
import cryptoJs from "crypto-js";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "../../utils/firebase-details";

import { SET_CURRENT_USER, SET_CURRENT_USER_ERROR } from "./user-action-types";

export const setCurrentUser = (userData) => ({
  type: SET_CURRENT_USER,
  payload: userData,
});

export const setCurrentUserError = (error) => ({
  type: SET_CURRENT_USER_ERROR,
  payload: error,
});

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      console.log({ token, user });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log({ errorCode, errorMessage, email, credential });
    });
};

export const loginUser = async (loginData) => {
  const { email, password } = loginData;

  try {
    const userData = await axios.post("/auth/login", {
      password,
      email,
    });

    const stringifyUserData = JSON.stringify(userData.data.data);
    const cipherText = cryptoJs.AES.encrypt(
      stringifyUserData,
      process.env.REACT_APP_CIPHER_SECRET_TOKEN
    );
    localStorage.setItem(
      process.env.REACT_APP_CIPHER_LOCALSTORAGE_KEY,
      cipherText
    );

    return { ...userData.data, error: false };
  } catch (err) {
    return { ...err.response, error: true };
  }
};

export const registerUser = async (registrationData) => {
  try {
    const userData = await axios.post("/auth/register", registrationData);
    return { ...userData.data, error: false };
  } catch (err) {
    return { ...err.response, error: true };
  }
};

export const logOutUser = async () => {
  try {
    await axios.post("/auth/logout");
    localStorage.removeItem(process.env.REACT_APP_CIPHER_LOCALSTORAGE_KEY);
  } catch (err) {
    console.log(err);
    // return { error: true, data: err.response.data.message };
  }
};

export const getUserDataOnRefresh = async () => {
  if (localStorage.getItem(process.env.REACT_APP_CIPHER_LOCALSTORAGE_KEY)) {
    const encryptedText = localStorage.getItem(
      process.env.REACT_APP_CIPHER_LOCALSTORAGE_KEY
    );
    const bytes = cryptoJs.AES.decrypt(
      encryptedText,
      process.env.REACT_APP_CIPHER_SECRET_TOKEN
    );
    const decryptedData = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
    return decryptedData;
  }

  return null;
};
