import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  addHealthData,
  updateHealthData,
} from "../../store/health/health-action-creator";
import { parseDate } from "../../utils/dateParser";

import InputForm from "../../components/input-form/InputForm.component";
import Button from "../../components/button/Button.component";
import AnimalDropdown from "../../components/animal-dropdown/AnimalDropdown.component";
import Dropdown from "../../components/dropdown/Dropdown.component";

const AddHealth = () => {
  const navigate = useNavigate();
  const { healthRecords } = useSelector((state) => state.health);
  const { page, healthId } = useLocation().state;
  const [healthFields, setHealthFields] = useState({
    animal_id: "",
    treatment_type: "",
    medicine: "",
    date: "",
  });
  const { animal_id, treatment_type, medicine, date } = healthFields;
  const treatmentTypes = [
    { value: "vaccine", label: "Vaccine" },
    { value: "deworming", label: "Deworming" },
  ];

  useEffect(() => {
    if (page === "addHealth") return;
    const milkD = healthRecords.filter((m) => m.id === healthId)[0];

    const { animal_id, treatment_type, medicine, date } = milkD;

    setHealthFields({
      ...healthFields,
      animal_id,
      treatment_type,
      medicine,
      date: parseDate(date),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeHandler = (e) => {
    setHealthFields({ ...healthFields, [e.target.name]: e.target.value });
  };

  const healthFormHandler = async (e) => {
    e.preventDefault();

    const healthD =
      page === "addHealth"
        ? await addHealthData(healthFields)
        : await updateHealthData(healthFields, healthId);

    const { error } = healthD;
    if (error) return;
    return navigate("/health");
  };

  return (
    <div className="auth">
      <h2 className="auth-title">
        {page === "addHealth" ? "Add" : "Update"} Health Record
      </h2>
      <form className="auth-form" onSubmit={healthFormHandler}>
        {/* {error && <span className="err-msg">{errorMsg}</span>} */}

        <AnimalDropdown
          id="animal_id"
          label="Animal"
          name="animal_id"
          placeholder="Select Animal"
          onChangeHandler={onChangeHandler}
          inputValue={animal_id}
        />
        <Dropdown
          id="treatment_type"
          label="Treatment type"
          name="treatment_type"
          inputValue={treatment_type}
          onChangeHandler={onChangeHandler}
          placeholder="Treatment type"
          children={treatmentTypes.map((treat) => (
            <option value={treat.value} key={treat.value}>
              {treat.label}
            </option>
          ))}
        />
        <InputForm
          id="medicine"
          label="Medicine"
          name="medicine"
          inputValue={medicine}
          onChangeHandler={onChangeHandler}
          placeholder="Medicine"
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

        <Button
          text={`${page === "addHealth" ? "Add" : "Update"} Health Record`}
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddHealth;
