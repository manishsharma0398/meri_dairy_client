import React, { useState } from "react";
import Button from "../../components/button/Button.component";

import InputForm from "../../components/input-form/InputForm.component";
import RadioInput from "../../components/radio-input/RadioInput.component";

import { addNewAnimal } from "../../store/animal/animal-action-creator";

import "./AddAnimal.styles.scss";

const AddAnimal = () => {
  const [animalFields, setAnimalFields] = useState({
    identifier: "",
    breed: "",
    animal_type: "",
    animal_status: "",
    date: "",
    gender: "",
    remarks: "",
    photo_url: "",
    bull_name: "",
    dam_name: "",
    bull_breed: "",
    dam_breed: "",
  });
  const [error, setError] = useState("");

  const {
    identifier,
    breed,
    date,
    remarks,
    bull_name,
    dam_name,
    bull_breed,
    dam_breed,
  } = animalFields;

  const onChangeHandler = (e) => {
    setAnimalFields({ ...animalFields, [e.target.name]: e.target.value });
  };

  const onRadioInputChangeHandler = (e) => {
    setAnimalFields({ ...animalFields, [e.target.name]: e.target.value });
  };

  const addNewAnimalHandler = async (e) => {
    e.preventDefault();

    console.log(animalFields);

    try {
      addNewAnimal(animalFields);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth">
      <h2 className="auth-title">Add Animal</h2>
      <form className="auth-form" onSubmit={addNewAnimalHandler}>
        {error && <span className="err-msg">{setError}</span>}

        <label className="label">Animal</label>
        <RadioInput
          id="cow"
          label="Cow"
          name="animal_type"
          inputValue="cow"
          onChangeHandler={onRadioInputChangeHandler}
        />
        <RadioInput
          id="goat"
          label="Goat"
          name="animal_type"
          inputValue="goat"
          onChangeHandler={onRadioInputChangeHandler}
        />
        <RadioInput
          id="buffalo"
          label="Buffalo"
          name="animal_type"
          inputValue="buffalo"
          onChangeHandler={onRadioInputChangeHandler}
        />

        <InputForm
          id="identifier"
          label="Identifier"
          name="identifier"
          inputValue={identifier}
          onChangeHandler={onChangeHandler}
          placeholder="Animal Name/ Tag No/ Or Any Marks"
        />
        <InputForm
          id="breed"
          label="Breed"
          name="breed"
          inputValue={breed}
          onChangeHandler={onChangeHandler}
          placeholder="Animal Breed"
        />
        <label className="label">Gender</label>
        <RadioInput
          id="male"
          label="Male"
          name="gender"
          inputValue="male"
          onChangeHandler={onRadioInputChangeHandler}
        />
        <RadioInput
          id="female"
          label="Female"
          name="gender"
          inputValue="female"
          onChangeHandler={onRadioInputChangeHandler}
        />

        <label className="label">Animal Status</label>
        <RadioInput
          id="purchased"
          label="Purchased"
          name="animal_status"
          inputValue="purchased"
          onChangeHandler={onRadioInputChangeHandler}
        />
        <RadioInput
          id="born_on_farm"
          label="Born On Farm"
          name="animal_status"
          inputValue="born_on_farm"
          onChangeHandler={onRadioInputChangeHandler}
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
          id="remarks"
          label="Remarks"
          name="remarks"
          inputValue={remarks}
          onChangeHandler={onChangeHandler}
          placeholder="Remarks"
        />
        <InputForm
          id="bull_name"
          label="Bull Name"
          name="bull_name"
          inputValue={bull_name}
          onChangeHandler={onChangeHandler}
          placeholder="Bull Name"
        />
        <InputForm
          id="bull_breed"
          label="Bull Breed"
          name="bull_breed"
          inputValue={bull_breed}
          onChangeHandler={onChangeHandler}
          placeholder="Bull Breed"
        />
        <InputForm
          id="dam_name"
          label="Dam Name"
          name="dam_name"
          inputValue={dam_name}
          onChangeHandler={onChangeHandler}
          placeholder="Dam Name"
        />
        <InputForm
          id="dam_breed"
          label="Dam Breed"
          name="dam_breed"
          inputValue={dam_breed}
          onChangeHandler={onChangeHandler}
          placeholder="Dam Breed"
        />

        <Button text="Add Animal" type="submit" />
      </form>
    </div>
  );
};

export default AddAnimal;
