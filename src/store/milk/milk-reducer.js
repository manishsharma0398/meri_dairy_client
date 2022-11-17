import { SET_MILK } from "./milk-action-types";

const INITIAL_STATE = {
  milkData: null,
};

export const milkReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MILK:
      return { ...state, milkData: payload };

    default:
      return state;
  }
};
