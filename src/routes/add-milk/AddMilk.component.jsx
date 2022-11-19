import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { parseDate } from "../../utils/dateParser";
import {
  addMilkData,
  updateMilkData,
} from "../../store/milk/milk-action-creator";

import Dropdown from "../../components/animal-dropdown/AnimalDropdown.component";
import InputForm from "../../components/input-form/InputForm.component";
import Form from "../../components/form/Form.component";

const AddMilk = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
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
    console.log(e.target.name, e.target.value);
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
    <Form
      formHeading={`${page === "addMilk" ? "Add" : "Update"}  Milk Record`}
      onSubmitFormHandler={milkFormHandler}
      error={error}
      errorMsg={errorMsg}
      btnText={`${page === "addMilk" ? "Add" : "Update"} Milk Record`}
      children={
        <Fragment>
          <Dropdown
            id="a_id"
            label="Animal"
            name="a_id"
            placeholder="Select Animal"
            onChangeHandler={onChangeHandler}
            inputValue={a_id}
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
        </Fragment>
      }
    />
  );
};

export default AddMilk;
