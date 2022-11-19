import React, { useState, useEffect, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  addHealthData,
  updateHealthData,
} from "../../store/health/health-action-creator";
import { parseDate } from "../../utils/dateParser";

import InputForm from "../../components/input-form/InputForm.component";
import AnimalDropdown from "../../components/animal-dropdown/AnimalDropdown.component";
import Dropdown from "../../components/dropdown/Dropdown.component";
import Form from "../../components/form/Form.component";

const AddHealth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
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
    <Form
      formHeading={`${page === "addHealth" ? "Add" : "Update"} Health Record`}
      onSubmitFormHandler={healthFormHandler}
      error={error}
      errorMsg={errorMsg}
      btnText={`${page === "addHealth" ? "Add" : "Update"} Health Record`}
      children={
        <Fragment>
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
        </Fragment>
      }
    />
  );
};

export default AddHealth;
