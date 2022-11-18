import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  addTreatmentData,
  updateTreatmentData,
} from "../../store/treatment/treatment-action-creator";

import { parseDate } from "../../utils/dateParser";

import InputForm from "../../components/input-form/InputForm.component";
import Button from "../../components/button/Button.component";

const AddTreatment = () => {
  const navigate = useNavigate();
  const { treatmentData } = useSelector((state) => state.treatment);
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

    setTreatmentFields({
      ...treatmentFields,
      animal_id: trans.animal_id,
      vet_name: trans.vet_name,
      medicine_with_quantity: trans.medicine_with_quantity,
      disease: trans.disease,
      disease_remarks: trans.disease_remarks,
      treatment_remarks: trans.treatment_remarks,
      cost: trans.cost,
      date: parseDate(trans.date),
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

    const tr =
      page === "addTreatment"
        ? await addTreatmentData(treatmentFields)
        : await updateTreatmentData(treatmentFields, treatmentId);

    console.log(tr);

    const { error } = tr;
    if (error) return;
    navigate("/treatment");
  };

  return (
    <div className="auth">
      <h2 className="auth-title">
        {page === "addTreatment" ? "Add" : "Update"} Treatment
      </h2>
      <form className="auth-form" onSubmit={treatmentFormHandler}>
        {/* {error && <span className="err-msg">{errorMsg}</span>} */}

        <InputForm
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
          inputValue={parseDate(date)}
          onChangeHandler={onChangeHandler}
          placeholder="Date"
          type="date"
        />

        <Button
          text={`${page === "addTreatment" ? "Add" : "Update"} Treatment`}
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddTreatment;
