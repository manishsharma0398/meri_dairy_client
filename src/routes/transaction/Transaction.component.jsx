import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import moment from "moment";

import {
  getTransactionData,
  setTransactionData,
  deleteTransaction,
} from "../../store/transaction/transaction-action-creator";

const Transaction = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transaction);

  const getTransactions = async () => {
    const { error, data } = await getTransactionData();
    if (error) return;
    dispatch(setTransactionData(data));
  };

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteTransactionHandler = async (id) => {
    const { error } = await deleteTransaction(id);
    if (error) return;
    const updTransactRecords = transactions.filter((m) => m.id !== id);
    dispatch(setTransactionData(updTransactRecords));
  };

  return (
    <div>
      <Link
        state={{ page: "addTransaction", transactId: null }}
        className="btn btn-link"
        to="/transactions/add"
      >
        Add Transaction
      </Link>

      {transactions &&
        transactions.map((trans) => {
          const { id, title, remarks, amount, mode, date, type } = trans;
          return (
            <div
              style={{
                border: "1px solid gray",
                marginBottom: "10px",
                padding: "10px",
              }}
              key={id}
            >
              <div className="actions">
                <Link
                  state={{ page: "editTransaction", transactId: id }}
                  to={`/transactions/edit`}
                >
                  <FiEdit3 className="act" style={{ color: "blue" }} />{" "}
                </Link>
                <FiTrash2
                  onClick={() => deleteTransactionHandler(id)}
                  className="act"
                  style={{ color: "red" }}
                />
              </div>
              <h2>
                {title} - ₹ {amount}
              </h2>
              <h2>Date: {moment(date).format("dddd Do MMMM YYYY")}</h2>
              <h2>Type: {type}</h2>
              <h2>Mode: {mode}</h2>
              <h2>Remarks: {remarks}</h2>
            </div>
          );
        })}
    </div>
  );
};

export default Transaction;
