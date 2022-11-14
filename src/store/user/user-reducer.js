import { SET_CURRENT_USER, SET_CURRENT_USER_ERROR } from "./user-action-types";

const INITIAL_STATE = {
  currentUser: null,
  error: false,
  errorMsg: "",
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: payload };

    case SET_CURRENT_USER_ERROR:
      return { ...state, error: payload.error, errorMsg: payload.errorMsg };

    default:
      return state;
  }
};
