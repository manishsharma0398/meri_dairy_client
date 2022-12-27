import { SET_MILK, SET_MILK_ERROR } from "./milk-action-types";

const INITIAL_STATE = {
  milkData: null,
  milkError: null,
};

export const milkReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MILK:
      return { ...state, milkData: payload };

    case SET_MILK_ERROR:
      return { ...state, milkError: payload };

    default:
      return state;
  }
};
