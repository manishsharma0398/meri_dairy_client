import { SET_TREATMENT_DATA } from "./treatment-action-types";

const INITIAL_STATE = {
  treatmentData: null,
};

export const treatmentReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_TREATMENT_DATA:
      return { ...state, treatmentData: payload };

    default:
      return state;
  }
};
