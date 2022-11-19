import React, { useState, useEffect, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  addTransactionData,
  updateTransactionData,
} from "../../store/transaction/transaction-action-creator";

import { parseDate } from "../../utils/dateParser";

import InputForm from "../../components/input-form/InputForm.component";
import Button from "../../components/button/Button.component";
import Dropdown from "../../components/dropdown/Dropdown.component";

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

    const { title, remarks, amount, mode, type, date } = trans;

    setTransactionFields({
      ...transactionFields,
      title,
      remarks,
      amount,
      mode,
      type,
      date: parseDate(date),
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

    const { error } =
      page === "addTransaction"
        ? await addTransactionData(transactionFields)
        : await updateTransactionData(transactionFields, transactId);
    if (error) return;
    navigate("/transactions");
  };

  const paymentModes = [
    { value: "cash", label: "Cash" },
    { value: "online", label: "Online" },
    { value: "debt", label: "Debt" },
    { value: "bank", label: "Bank" },
  ];

  const paymentTypes = [
    { value: "expense", label: "Expense" },
    { value: "income", label: "Income" },
  ];

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
        {/* ? type --- cash or online */}
        <Dropdown
          id="mode"
          label="Payment Mode"
          name="mode"
          inputValue={mode}
          onChangeHandler={onChangeHandler}
          placeholder="Payment Mode"
          children={paymentModes.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        />
        <Dropdown
          id="type"
          label="Type"
          name="type"
          inputValue={type}
          onChangeHandler={onChangeHandler}
          placeholder="Type"
          children={paymentTypes.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
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
