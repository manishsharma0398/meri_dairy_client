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
    animal: "",
    time: "",
    date: "",
    quantity: "",
  });

  const { animal, time, date, quantity } = milkFields;

  useEffect(() => {
    if (page === "addMilk") return;
    const milkD = milkData.filter((m) => m.id === milkId)[0];

    setMilkFields({
      ...milkFields,
      animal: milkD.a_id,
      date: parseDate(milkD.date),
      time: milkD.time,
      quantity: milkD.quantity,
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
          id="animal"
          label="Animal"
          name="animal"
          inputValue={animal}
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
