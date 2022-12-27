import {
  SET_TRANSACTION_ERROR,
  SET_TRANSACTION_RECORDS,
} from "./transaction-action-types";

const INITIAL_STATE = {
  transactions: null,
  transactionsError: null,
};

export const transactionReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TRANSACTION_RECORDS:
      return { ...state, transactions: payload };

    case SET_TRANSACTION_ERROR:
      return { ...state, transactionsError: payload };

    default:
      return state;
  }
};
