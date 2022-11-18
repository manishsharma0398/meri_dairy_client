import { SET_WORKER_RECORDS } from "./worker-action-types";

const INITIAL_STATE = {
  workers: null,
};

export const workerReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_WORKER_RECORDS:
      return { ...state, workers: payload };

    default:
      return state;
  }
};
