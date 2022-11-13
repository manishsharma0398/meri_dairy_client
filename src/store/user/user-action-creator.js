import { SET_CURRENT_USER } from "./user-action-types";

export const setCurrentUser = (userData) => {
  return { type: SET_CURRENT_USER, payload: userData };
};
