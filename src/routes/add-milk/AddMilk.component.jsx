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
import updateState from "../../utils/updateState";
import Spinner from "../../components/spinner/Spinner.component";

const AddMilk = () => {
  const initMilkErrors = {
    a_id_error: "",
    time_error: "",
    date_error: "",
    quantity_error: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const { milkData } = useSelector((state) => state.milk);
  const navigate = useNavigate();
  const { page, milkId } = useLocation().state;
  const [milkFields, setMilkFields] = useState({
    a_id: "",
    time: "",
    date: "",
    quantity: "",
  });
  const [milkErrors, setMilkErrors] = useState(initMilkErrors);

  const { a_id, time, date, quantity } = milkFields;
  const { a_id_error, time_error, date_error, quantity_error } = milkErrors;

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

    setMilkErrors(initMilkErrors);
    setIsLoading(true);

    const milkD =
      page === "addMilk"
        ? await addMilkData(milkFields)
        : await updateMilkData(milkFields, milkId);

    setIsLoading(false);
    const { error, data } = milkD;
    if (error)
      return setMilkErrors((state) => {
        return updateState({ state, data });
      });
    return navigate("/milk");
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Form
      formHeading={`${page === "addMilk" ? "Add" : "Update"}  Milk Record`}
      onSubmitFormHandler={milkFormHandler}
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
            dropdownError={a_id_error}
            required={true}
          />
          <InputForm
            id="time"
            label="Time"
            name="time"
            inputValue={time}
            onChangeHandler={onChangeHandler}
            placeholder="Time"
            inputError={time_error}
            required={true}
          />
          <InputForm
            id="date"
            label="Date"
            name="date"
            inputValue={date}
            onChangeHandler={onChangeHandler}
            placeholder="Date"
            type="date"
            inputError={date_error}
            required={true}
          />
          <InputForm
            id="quantity"
            label="Quantity"
            name="quantity"
            inputValue={quantity}
            onChangeHandler={onChangeHandler}
            placeholder="Quantity"
            inputError={quantity_error}
            required={true}
          />
        </Fragment>
      }
    />
  );
};

export default AddMilk;
