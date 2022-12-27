import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteTransaction,
  setTransactionData,
} from "../../store/transaction/transaction-action-creator";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

import TableActions from "../table-actions/TableActions.component";

const TransactionItem = ({ transaction, slNo }) => {
  const { id, title, amount, mode, date, type } = transaction;

  const { transactions } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  const deleteTransactionHandler = async (id) => {
    const { error } = await deleteTransaction(id);
    if (error) return;
    const updTransactRecords = transactions.filter((m) => m.id !== id);
    dispatch(setTransactionData(updTransactRecords));
  };

  return (
    <tr>
      <td>{slNo}</td>
      <td>{moment(date).format("DD-MM-YYYY")}</td>
      <td>{capitalizeFirstLetter(title)}</td>
      <td>₹ {amount}</td>
      <td>{capitalizeFirstLetter(mode)}</td>
      <td>{capitalizeFirstLetter(type)}</td>
      <td>
        <TableActions
          deleteHandler={deleteTransactionHandler}
          editLink="/transactions/edit"
          editLinkState={{ page: "editTransaction", transactId: id }}
        />
      </td>
    </tr>
  );
};

export default TransactionItem;
