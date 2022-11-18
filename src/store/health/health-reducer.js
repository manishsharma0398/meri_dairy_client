import { SET_HEALTH_RECORDS } from "./health-action-types";

const INITIAL_STATE = {
  healthRecords: null,
};

export const healthReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case SET_HEALTH_RECORDS:
      return { ...state, healthRecords: payload };

    default:
      return state;
  }
};
