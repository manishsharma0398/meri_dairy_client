import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { getTransactionData } from "../../store/transaction/transaction-action-creator";

import DialogBox from "../../components/dialog-box/DialogBox.component";
import TransactionItem from "../../components/transaction-item/TransactionItem.component";

const Transaction = () => {
  const { transactions } = useSelector((state) => state.transaction);
  const { deleteDialogBox } = useSelector((state) => state.UI);

  return (
    <div>
      <div className="content">
        <Fragment>
          {deleteDialogBox && <DialogBox />}
          {!transactions && <h2>Loading...</h2>}
          {transactions && transactions.length === 0 && (
            <h2>No Records. Please add</h2>
          )}
          {/* {!err && ( */}
          <Link
            state={{ page: "addTransaction", transactId: null }}
            className="btn btn-link"
            to="/transactions/add"
          >
            Add Transaction
          </Link>
          {/* )} */}
          {/* {err && ( */}
          {!transactions && (
            <div>
              <h2 className="err-msg">
                Something went wrong. Please try again
              </h2>
              <Link onClick={getTransactionData} className="btn btn-link">
                Refresh Page
              </Link>
            </div>
          )}
        </Fragment>

        {transactions && transactions.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Transaction;
