import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { parseDate } from "../../utils/dateParser";

import {
  addMilkData,
  updateMilkData,
} from "../../store/milk/milk-action-creator";

import InputForm from "../../components/input-form/InputForm.component";
import Button from "../../components/button/Button.component";

const AddMilk = () => {
  const { milkData } = useSelector((state) => state.milk);
  const navigate = useNavigate();
  const { page, milkId } = useLocation().state;
  const [milkFields, setMilkFields] = useState({
    a_id: "",
    time: "",
    date: "",
    quantity: "",
  });

  const { a_id, time, date, quantity } = milkFields;

  useEffect(() => {
    if (page === "addMilk") return;
    const milkD = milkData.filter((m) => m.id === milkId)[0];
    const { a_id, time, date, quantity } = milkD;
    setMilkFields({
      ...milkFields,
      a_id,
      date: parseDate(date),
      time,
      quantity,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeHandler = (e) => {
    setMilkFields({ ...milkFields, [e.target.name]: e.target.value });
  };

  const milkFormHandler = async (e) => {
    e.preventDefault();

    const milkD =
      page === "addMilk"
        ? await addMilkData(milkFields)
        : await updateMilkData(milkFields, milkId);

    const { error } = milkD;
    if (error) return;
    navigate("/milk");
  };

  return (
    <div className="auth">
      <h2 className="auth-title">
        {page === "addMilk" ? "Add" : "Update"} Milk Record
      </h2>
      <form className="auth-form" onSubmit={milkFormHandler}>
        {/* {error && <span className="err-msg">{errorMsg}</span>} */}

        <InputForm
          id="a_id"
          label="Animal"
          name="a_id"
          inputValue={a_id}
          onChangeHandler={onChangeHandler}
          placeholder="Animal"
        />
        <InputForm
          id="time"
          label="Time"
          name="time"
          inputValue={time}
          onChangeHandler={onChangeHandler}
          placeholder="Time"
        />
        <InputForm
          id="date"
          label="Date"
          name="date"
          inputValue={date}
          onChangeHandler={onChangeHandler}
          placeholder="Date"
          type="date"
        />
        <InputForm
          id="quantity"
          label="Quantity"
          name="quantity"
          inputValue={quantity}
          onChangeHandler={onChangeHandler}
          placeholder="Quantity"
        />

        <Button
          text={`${page === "addMilk" ? "Add" : "Update"} Milk Record`}
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddMilk;
