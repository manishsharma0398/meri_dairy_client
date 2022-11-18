import { SET_MATING_DATA } from "./mating-action-types";

const INITIAL_STATE = {
  matingData: null,
};

export const matingReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MATING_DATA:
      return { ...state, matingData: payload };

    default:
      return state;
  }
};
