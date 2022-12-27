import { SET_MATING_DATA, SET_MATING_ERROR } from "./mating-action-types";

const INITIAL_STATE = {
  matingData: null,
  matingError: null,
};

export const matingReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MATING_DATA:
      return { ...state, matingData: payload };

    case SET_MATING_ERROR:
      return { ...state, matingError: payload };

    default:
      return state;
  }
};
