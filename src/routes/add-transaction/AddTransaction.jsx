import React, { useState, useEffect, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  addTransactionData,
  updateTransactionData,
} from "../../store/transaction/transaction-action-creator";

import { parseDate } from "../../utils/dateParser";

import InputForm from "../../components/input-form/InputForm.component";
import Dropdown from "../../components/dropdown/Dropdown.component";
import Form from "../../components/form/Form.component";
import updateState from "../../utils/updateState";
import Spinner from "../../components/spinner/Spinner.component";

const AddTransaction = () => {
  const initialTransactionError = {
    title_error: "",
    remarks_error: "",
    amount_error: "",
    mode_error: "",
    type_error: "",
    date_error: "",
  };
  const navigate = useNavigate();
  const { transactions } = useSelector((state) => state.transaction);
  const { page, transactId } = useLocation().state;
  const [transErrors, setTransErrors] = useState(initialTransactionError);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionFields, setTransactionFields] = useState({
    title: "",
    remarks: "",
    amount: "",
    mode: "",
    type: "",
    date: "",
  });
  const { title, remarks, amount, mode, date, type } = transactionFields;
  const {
    title_error,
    remarks_error,
    amount_error,
    mode_error,
    type_error,
    date_error,
  } = transErrors;

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
    setTransErrors(initialTransactionError);
    setIsLoading(true);

    const { error, data } =
      page === "addTransaction"
        ? await addTransactionData(transactionFields)
        : await updateTransactionData(transactionFields, transactId);
    setIsLoading(false);
    if (!error) return navigate("/transactions");
    return setTransErrors((state) => {
      return updateState({ state, data });
    });
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

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="auth">
      <Form
        formHeading={`${
          page === "addTransaction" ? "Add" : "Update"
        } Transaction`}
        onSubmitFormHandler={transactionFormHandler}
        btnText={`${page === "addTransaction" ? "Add" : "Update"} Transaction`}
        children={
          <Fragment>
            <InputForm
              id="title"
              label="Title"
              name="title"
              inputValue={title}
              onChangeHandler={onChangeHandler}
              placeholder="Title"
              inputError={title_error}
              // required={true}
            />
            <InputForm
              id="remarks"
              label="Remarks"
              name="remarks"
              inputValue={remarks}
              onChangeHandler={onChangeHandler}
              placeholder="Remarks"
              inputError={remarks_error}
              // required={true}
            />
            <InputForm
              id="amount"
              label="Amount"
              name="amount"
              inputValue={amount}
              onChangeHandler={onChangeHandler}
              placeholder="Amount"
              type="number"
              inputError={amount_error}
              // required={true}
            />

            <Dropdown
              id="mode"
              label="Payment Mode"
              name="mode"
              dropdownError={mode_error}
              // required={true}
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
              dropdownError={type_error}
              // required={true}
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
              inputError={date_error}
              // required={true}
            />
          </Fragment>
        }
      />
    </div>
  );
};

export default AddTransaction;
