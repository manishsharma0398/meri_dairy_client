import { SET_HEALTH_ERROR, SET_HEALTH_RECORDS } from "./health-action-types";

const INITIAL_STATE = {
  healthRecords: null,
  healthError: null,
};

export const healthReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_HEALTH_RECORDS:
      return { ...state, healthRecords: payload };

    case SET_HEALTH_ERROR:
      return { ...state, healthError: payload };

    default:
      return state;
  }
};
