import {
  SET_TREATMENT_DATA,
  SET_TREATMENT_ERROR,
} from "./treatment-action-types";

const INITIAL_STATE = {
  treatmentData: null,
  treatmentError: null,
};

export const treatmentReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_TREATMENT_DATA:
      return { ...state, treatmentData: payload };

    case SET_TREATMENT_ERROR:
      return { ...state, treatmentError: payload };

    default:
      return state;
  }
};
