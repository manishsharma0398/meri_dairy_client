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
import AnimalDropdown from "../../components/animal-dropdown/AnimalDropdown.component";
import Dropdown from "../../components/dropdown/Dropdown.component";

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
    } = mating;

    setMatingFields({
      ...matingFields,
      a_id,
      bull_or_ai,
      date: parseDate(date),
      bull_or_semen_name,
      bull_or_semen_id,
      breed,
      semen_brand,
      cost,
      success,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bullOrAIOptions = [
    { value: "bull", label: "Bull" },
    { value: "ai", label: "Artificial Insemination" },
  ];

  const successOptions = [
    { value: "true", label: "Success" },
    { value: "false", label: "Failed" },
  ];

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

        <AnimalDropdown
          id="a_id"
          label="Animal"
          name="a_id"
          inputValue={a_id}
          onChangeHandler={onChangeHandler}
          placeholder="Animal"
        />
        <Dropdown
          id="bull_or_ai"
          label="Bull Or AI"
          name="bull_or_ai"
          inputValue={bull_or_ai}
          onChangeHandler={onChangeHandler}
          placeholder="Bull Or AI"
          children={bullOrAIOptions.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
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
          label="Cost"
          name="cost"
          inputValue={cost}
          onChangeHandler={onChangeHandler}
          placeholder="Cost"
          type="number"
        />
        <Dropdown
          id="success"
          label="Success"
          name="success"
          inputValue={success}
          onChangeHandler={onChangeHandler}
          placeholder="Success"
          children={successOptions.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
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
          text={`${page === "addMating" ? "Add" : "Update"} Mating`}
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddMating;
