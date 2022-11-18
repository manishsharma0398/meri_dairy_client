import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  addMatingData,
  updateMatingData,
} from "../../store/mating/mating-action-creator";

import { parseDate } from "../../utils/dateParser";

import InputForm from "../../components/input-form/InputForm.component";
import Button from "../../components/button/Button.component";

const AddMating = () => {
  const navigate = useNavigate();
  const { matingData } = useSelector((state) => state.mating);
  const { page, matingId } = useLocation().state;
  const [matingFields, setMatingFields] = useState({
    a_id: "",
    date: "",
    bull_or_ai: "",
    bull_or_semen_name: "",
    bull_or_semen_id: "",
    breed: "",
    semen_brand: "",
    cost: "",
    success: "",
  });
  const {
    a_id,
    date,
    bull_or_ai,
    bull_or_semen_name,
    bull_or_semen_id,
    breed,
    semen_brand,
    cost,
    success,
  } = matingFields;

  useEffect(() => {
    if (page === "addMating") return;
    const mating = matingData.filter((m) => m.id === matingId)[0];

    setMatingFields({
      ...matingFields,
      a_id: mating.a_id,
      bull_or_ai: mating.bull_or_ai,
      bull_or_semen_name: mating.bull_or_semen_name,
      bull_or_semen_id: mating.bull_or_semen_id,
      breed: mating.breed,
      semen_brand: mating.semen_brand,
      cost: mating.cost,
      success: mating.success,
      date: parseDate(mating.date),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeHandler = (e) => {
    setMatingFields({
      ...matingFields,
      [e.target.name]: e.target.value,
    });
  };

  const matingFormHandler = async (e) => {
    e.preventDefault();

    const tr =
      page === "addMating"
        ? await addMatingData(matingFields)
        : await updateMatingData(matingFields, matingId);

    console.log(tr);

    const { error } = tr;
    if (error) return;
    navigate("/mating");
  };

  return (
    <div className="auth">
      <h2 className="auth-title">
        {page === "addMating" ? "Add" : "Update"} Mating
      </h2>
      <form className="auth-form" onSubmit={matingFormHandler}>
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
          id="bull_or_ai"
          label="Bull Or AI"
          name="bull_or_ai"
          inputValue={bull_or_ai}
          onChangeHandler={onChangeHandler}
          placeholder="Bull Or AI"
        />
        <InputForm
          id="bull_or_semen_name"
          label="Bull Or Semen Name"
          name="bull_or_semen_name"
          inputValue={bull_or_semen_name}
          onChangeHandler={onChangeHandler}
          placeholder="Bull Or Semen Name"
        />
        <InputForm
          id="bull_or_semen_id"
          label="Bull/Semen Id"
          name="bull_or_semen_id"
          inputValue={bull_or_semen_id}
          onChangeHandler={onChangeHandler}
          placeholder="Bull/Semen Id"
        />
        <InputForm
          id="breed"
          label="Breed"
          name="breed"
          inputValue={breed}
          onChangeHandler={onChangeHandler}
          placeholder="Breed"
        />
        <InputForm
          id="semen_brand"
          label="Semen Brand"
          name="semen_brand"
          inputValue={semen_brand}
          onChangeHandler={onChangeHandler}
          placeholder="Semen Brand"
        />
        <InputForm
          id="cost"
          label="Treatment Price"
          name="cost"
          inputValue={cost}
          onChangeHandler={onChangeHandler}
          placeholder="Treatment Price"
          type="number"
        />
        <InputForm
          id="success"
          label="Success"
          name="success"
          inputValue={success}
          onChangeHandler={onChangeHandler}
          placeholder="Success"
          type="boolean"
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
          text={`${page === "addMating" ? "Add" : "Update"} Treatment`}
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddMating;
