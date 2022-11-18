import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  addTransactionData,
  updateTransactionData,
} from "../../store/transaction/transaction-action-creator";

import { parseDate } from "../../utils/dateParser";

import InputForm from "../../components/input-form/InputForm.component";
import Button from "../../components/button/Button.component";

const AddTransaction = () => {
  const navigate = useNavigate();
  const { transactions } = useSelector((state) => state.transaction);
  const { page, transactId } = useLocation().state;
  const [transactionFields, setTransactionFields] = useState({
    title: "",
    remarks: "",
    amount: "",
    mode: "",
    type: "",
    date: "",
  });
  const { title, remarks, amount, mode, date, type } = transactionFields;

  useEffect(() => {
    if (page === "addTransaction") return;
    const trans = transactions.filter((m) => m.id === transactId)[0];

    setTransactionFields({
      ...transactionFields,
      title: trans.title,
      remarks: trans.remarks,
      amount: trans.amount,
      mode: trans.mode,
      type: trans.type,
      date: parseDate(trans.date),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeHandler = (e) => {
    setTransactionFields({
      ...transactionFields,
      [e.target.name]: e.target.value,
    });
  };

  const transactionFormHandler = async (e) => {
    e.preventDefault();

    const tr =
      page === "addTransaction"
        ? await addTransactionData(transactionFields)
        : await updateTransactionData(transactionFields, transactId);

    console.log(tr);

    const { error } = tr;
    if (error) return;
    navigate("/transactions");
  };

  return (
    <div className="auth">
      <h2 className="auth-title">
        {page === "addTransaction" ? "Add" : "Update"} Transaction
      </h2>
      <form className="auth-form" onSubmit={transactionFormHandler}>
        {/* {error && <span className="err-msg">{errorMsg}</span>} */}

        <InputForm
          id="title"
          label="Title"
          name="title"
          inputValue={title}
          onChangeHandler={onChangeHandler}
          placeholder="Title"
        />
        <InputForm
          id="remarks"
          label="Remarks"
          name="remarks"
          inputValue={remarks}
          onChangeHandler={onChangeHandler}
          placeholder="Remarks"
        />
        <InputForm
          id="amount"
          label="Amount"
          name="amount"
          inputValue={amount}
          onChangeHandler={onChangeHandler}
          placeholder="Amount"
          type="number"
        />
        <InputForm
          id="mode"
          label="Payment Mode"
          name="mode"
          inputValue={mode}
          onChangeHandler={onChangeHandler}
          placeholder="Payment Mode"
        />
        <InputForm
          id="type"
          label="Type"
          name="type"
          inputValue={type}
          onChangeHandler={onChangeHandler}
          placeholder="Type"
        />
        <InputForm
          id="date"
          label="Date"
          name="date"
          inputValue={parseDate(date)}
          onChangeHandler={onChangeHandler}
          placeholder="Date"
          type="date"
        />

        <Button
          text={`${page === "addTransaction" ? "Add" : "Update"} Transaction`}
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddTransaction;
