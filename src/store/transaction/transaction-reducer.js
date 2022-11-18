import { SET_TRANSACTION_RECORDS } from "./transaction-action-types";

const INITIAL_STATE = {
  transactions: null,
};

export const transactionReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TRANSACTION_RECORDS:
      return { ...state, transactions: payload };

    default:
      return state;
  }
};
