import axios from "axios";

import { SET_TRANSACTION_RECORDS } from "./transaction-action-types";

export const setTransactionData = (transactionData) => ({
  type: SET_TRANSACTION_RECORDS,
  payload: transactionData,
});

export const addTransactionData = async (transactionDetails) => {
  try {
    await axios.post("/transaction/add", transactionDetails);
    return { error: false, message: "Transaction Added Successfully" };
  } catch (err) {
    return { ...err.response, error: true };
  }
};

export const updateTransactionData = async (transaction, transId) => {
  try {
    await axios.put(`/transaction/${transId}`, transaction);
    return { error: false, message: "Transaction Updated Successfully" };
  } catch (err) {
    return { ...err.response, error: true };
  }
};

export const getTransactionData = async () => {
  try {
    const res = await axios.get("/transaction/all");
    return { error: false, data: res.data };
  } catch (err) {
    return { ...err.response, error: true };
  }
};

export const deleteTransaction = async (id) => {
  try {
    await axios.delete(`/transaction/${id}`);
    return { error: false, message: "Transaction Deleted" };
  } catch (err) {
    return { ...err.response, error: true };
  }
};
