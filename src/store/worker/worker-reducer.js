import { SET_WORKER_ERROR, SET_WORKER_RECORDS } from "./worker-action-types";

const INITIAL_STATE = {
  workers: null,
  workersError: null,
};

export const workerReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_WORKER_RECORDS:
      return { ...state, workers: payload };

    case SET_WORKER_ERROR:
      return { ...state, workersError: payload };

    default:
      return state;
  }
};
