import React, { useState, useEffect, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  addTreatmentData,
  updateTreatmentData,
} from "../../store/treatment/treatment-action-creator";
import { parseDate } from "../../utils/dateParser";

import InputForm from "../../components/input-form/InputForm.component";
import Button from "../../components/button/Button.component";
import AnimalDropdown from "../../components/animal-dropdown/AnimalDropdown.component";
import Form from "../../components/form/Form.component";

const AddTreatment = () => {
  const navigate = useNavigate();
  const { treatmentData } = useSelector((state) => state.treatment);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { page, treatmentId } = useLocation().state;
  const [treatmentFields, setTreatmentFields] = useState({
    animal_id: "",
    date: "",
    vet_name: "",
    medicine_with_quantity: "",
    disease: "",
    disease_remarks: "",
    treatment_remarks: "",
    cost: "",
  });
  const {
    animal_id,
    date,
    vet_name,
    medicine_with_quantity,
    disease,
    disease_remarks,
    treatment_remarks,
    cost,
  } = treatmentFields;

  useEffect(() => {
    if (page === "addTreatment") return;
    const trans = treatmentData.filter((m) => m.id === treatmentId)[0];

    const {
      animal_id,
      date,
      vet_name,
      medicine_with_quantity,
      disease,
      disease_remarks,
      treatment_remarks,
      cost,
    } = trans;

    setTreatmentFields({
      ...treatmentFields,
      animal_id,
      vet_name,
      medicine_with_quantity,
      disease,
      disease_remarks,
      treatment_remarks,
      cost,
      date: parseDate(date),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeHandler = (e) => {
    setTreatmentFields({
      ...treatmentFields,
      [e.target.name]: e.target.value,
    });
  };

  const treatmentFormHandler = async (e) => {
    e.preventDefault();

    const { error } =
      page === "addTreatment"
        ? await addTreatmentData(treatmentFields)
        : await updateTreatmentData(treatmentFields, treatmentId);

    if (error) return;
    navigate("/treatment");
  };

  return (
    <Form
      formHeading={`${page === "addTreatment" ? "Add" : "Update"} Treatment`}
      onSubmitFormHandler={treatmentFormHandler}
      error={error}
      errorMsg={errorMsg}
      btnText={`${page === "addTreatment" ? "Add" : "Update"} Treatment`}
      children={
        <Fragment>
          <AnimalDropdown
            id="animal_id"
            label="Animal"
            name="animal_id"
            inputValue={animal_id}
            onChangeHandler={onChangeHandler}
            placeholder="Animal"
          />
          <InputForm
            id="vet_name"
            label="Vet Name"
            name="vet_name"
            inputValue={vet_name}
            onChangeHandler={onChangeHandler}
            placeholder="Vet Name"
          />
          <InputForm
            id="medicine_with_quantity"
            label="Medicine with Quantity"
            name="medicine_with_quantity"
            inputValue={medicine_with_quantity}
            onChangeHandler={onChangeHandler}
            placeholder="Medicine with Quantity"
          />
          <InputForm
            id="disease"
            label="Disease"
            name="disease"
            inputValue={disease}
            onChangeHandler={onChangeHandler}
            placeholder="Disease"
          />
          <InputForm
            id="disease_remarks"
            label="Disease Remarks"
            name="disease_remarks"
            inputValue={disease_remarks}
            onChangeHandler={onChangeHandler}
            placeholder="Disease Remarks"
          />
          <InputForm
            id="treatment_remarks"
            label="Treatment Remarks"
            name="treatment_remarks"
            inputValue={treatment_remarks}
            onChangeHandler={onChangeHandler}
            placeholder="Treatment Remarks"
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

export default AddTreatment;
