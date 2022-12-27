import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  addNewAnimal,
  updateAnimal,
} from "../../store/animal/animal-action-creator";
import { parseDate } from "../../utils/dateParser";
import { uploadPhoto } from "../../utils/uploadImageHandler";
import updateState from "../../utils/updateState";

import Form from "../../components/form/Form.component";
import InputForm from "../../components/input-form/InputForm.component";
import RadioInput from "../../components/radio-input/RadioInput.component";
import ImageUploader from "../../components/image-uploader/ImageUploader.component";

import "./AddAnimal.styles.scss";
import RadioGroup from "../../components/radio-group/RadioGroup.component";
import Spinner from "../../components/spinner/Spinner.component";

const AddAnimal = () => {
  const initialAnimalErrors = {
    identifier_error: "",
    breed_error: "",
    animal_type_error: "",
    animal_status_error: "",
    date_error: "",
    gender_error: "",
    remarks_error: "",
    photo_url_error: "",
    bull_name_error: "",
    dam_name_error: "",
    bull_breed_error: "",
    dam_breed_error: "",
  };

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
  const [isLoading, setIsLoading] = useState(false);
  const [animalErrorFields, setAnimalErrorFields] =
    useState(initialAnimalErrors);

  const {
    identifier_error,
    breed_error,
    animal_type_error,
    animal_status_error,
    date_error,
    gender_error,
    remarks_error,
    bull_name_error,
    dam_name_error,
    bull_breed_error,
    dam_breed_error,
  } = animalErrorFields;

  const [image, setImage] = useState({ preview: "", raw: "" });
  const { page, animalId } = useLocation().state;
  const navigate = useNavigate();
  const { allAnimals } = useSelector((state) => state.animals);

  const fillUpdtAnimalFields = () => {
    const animal = allAnimals.filter((a) => a.id === animalId)[0];
    setImage({
      preview: animal.photo_url,
      raw: animal.photo_url,
    });
    const { id, user_id, date, ...animalDetails } = animal;
    setAnimalFields({ ...animalDetails, date: parseDate(animal.date) });
  };

  useEffect(() => {
    if (page === "editAnimal") fillUpdtAnimalFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeHandler = (e) => {
    setAnimalFields({ ...animalFields, [e.target.name]: e.target.value });
  };

  const onFileChange = async (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const onSelectImgClear = () => {
    setImage({ preview: "", raw: "" });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // const { error, data } = await uploadPhoto(image);
    const { data } = await uploadPhoto(image);
    animalFields.photo_url = data;

    return addOrUpdtAnimalHandler();
  };

  const addOrUpdtAnimalHandler = async () => {
    setAnimalErrorFields(initialAnimalErrors);
    const { error, data } =
      page === "addAnimal"
        ? await addNewAnimal(animalFields)
        : await updateAnimal(animalFields, animalId);
    setIsLoading(false);
    if (!error) return navigate("/animals");
    return setAnimalErrorFields((state) => {
      return updateState({ state, data });
    });
  };

  const {
    identifier,
    breed,
    date,
    remarks,
    bull_name,
    dam_name,
    bull_breed,
    dam_breed,
    animal_type,
    animal_status,
    gender,
  } = animalFields;
  const { preview, raw } = image;

  return isLoading ? (
    <Spinner />
  ) : (
    <Form
      formHeading={page === "addAnimal" ? "Add Animal" : "Update Animal Data"}
      onSubmitFormHandler={handleSubmitForm}
      btnText={page === "addAnimal" ? "Add Animal" : "Update Animal Data"}
      children={
        <Fragment>
          <RadioGroup
            label="Animal"
            inputError={animal_type_error}
            children={
              <Fragment>
                <RadioInput
                  id="cow"
                  label="Cow"
                  name="animal_type"
                  inputValue="cow"
                  onChangeHandler={onChangeHandler}
                  checked={animal_type === "cow"}
                />
                <RadioInput
                  id="goat"
                  label="Goat"
                  name="animal_type"
                  inputValue="goat"
                  onChangeHandler={onChangeHandler}
                  checked={animal_type === "goat"}
                />
                <RadioInput
                  id="buffalo"
                  label="Buffalo"
                  name="animal_type"
                  inputValue="buffalo"
                  onChangeHandler={onChangeHandler}
                  checked={animal_type === "buffalo"}
                />
              </Fragment>
            }
          />

          <InputForm
            id="identifier"
            label="Identifier"
            name="identifier"
            inputValue={identifier}
            onChangeHandler={onChangeHandler}
            placeholder="Animal Name/ Tag No/ Or Any Marks"
            inputError={identifier_error}
            // required={true}
          />
          <InputForm
            id="breed"
            label="Breed"
            name="breed"
            inputValue={breed}
            onChangeHandler={onChangeHandler}
            placeholder="Animal Breed"
            inputError={breed_error}
            // required={true}
          />

          <RadioGroup
            label="Gender"
            inputError={gender_error}
            children={
              <Fragment>
                <RadioInput
                  id="male"
                  label="Male"
                  name="gender"
                  inputValue="male"
                  onChangeHandler={onChangeHandler}
                  checked={gender === "male"}
                />
                <RadioInput
                  id="female"
                  label="Female"
                  name="gender"
                  inputValue="female"
                  onChangeHandler={onChangeHandler}
                  checked={gender === "female"}
                />
              </Fragment>
            }
          />

          <RadioGroup
            inputError={animal_status_error}
            label="Animal Status"
            children={
              <Fragment>
                <RadioInput
                  id="purchased"
                  label="Purchased"
                  name="animal_status"
                  inputValue="purchased"
                  onChangeHandler={onChangeHandler}
                  checked={animal_status === "purchased"}
                />
                <RadioInput
                  id="born_on_farm"
                  label="Born On Farm"
                  name="animal_status"
                  inputValue="born_on_farm"
                  onChangeHandler={onChangeHandler}
                  checked={animal_status === "born_on_farm"}
                />
              </Fragment>
            }
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
            // required={true}
          />
          <InputForm
            id="remarks"
            label="Remarks"
            name="remarks"
            inputValue={remarks}
            onChangeHandler={onChangeHandler}
            placeholder="Remarks"
            inputError={remarks_error}
            // required={true}
          />
          <InputForm
            id="bull_name"
            label="Bull Name"
            name="bull_name"
            inputValue={bull_name}
            onChangeHandler={onChangeHandler}
            placeholder="Bull Name"
            inputError={bull_name_error}
            // required={true}
          />
          <InputForm
            id="bull_breed"
            label="Bull Breed"
            name="bull_breed"
            inputValue={bull_breed}
            onChangeHandler={onChangeHandler}
            placeholder="Bull Breed"
            inputError={bull_breed_error}
            // required={true}
          />
          <InputForm
            id="dam_name"
            label="Dam Name"
            name="dam_name"
            inputValue={dam_name}
            onChangeHandler={onChangeHandler}
            placeholder="Dam Name"
            inputError={dam_name_error}
            // required={true}
          />
          <InputForm
            id="dam_breed"
            label="Dam Breed"
            name="dam_breed"
            inputValue={dam_breed}
            onChangeHandler={onChangeHandler}
            placeholder="Dam Breed"
            inputError={dam_breed_error}
            // required={true}
          />
          <ImageUploader
            previewImage={preview}
            rawImage={raw}
            onFileChange={onFileChange}
            onSelectImgClear={onSelectImgClear}
          />
        </Fragment>
      }
    />
  );
};

export default AddAnimal;
