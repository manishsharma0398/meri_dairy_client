import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import {
  deleteAnimal,
  removeAnimalFromAllAnimals,
} from "../../store/animal/animal-action-creator";
import { setDeleteDialogBoxDisplay } from "../../store/ui/ui-action-creator";
import { placeholderImg } from "../../utils/placeholderImage";
import { parseDate } from "../../utils/dateParser";

import Details from "../../components/details/Details.component";
import DialogBox from "../../components/dialog-box/DialogBox.component";

import "./Animal.styles.scss";

const Animal = () => {
  const [animalDetails, setAnimalDetails] = useState({
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
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { animalId } = params;
  const { allAnimals } = useSelector((state) => state.animals);
  const { milkData } = useSelector((state) => state.milk);
  const { deleteDialogBox, deleteDialogBoxData } = useSelector(
    (state) => state.UI
  );

  useEffect(() => {
    const animal = allAnimals.filter(
      (a) => a.id.toString() === animalId.toString()
    );
    setAnimalDetails(animal[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    photo_url,
    id,
  } = animalDetails;

  const deleteAnimalHandler = async (e) => {
    e.preventDefault();
    console.log("oh ya");
    const { error, data } = await deleteAnimal(animalId);
    if (error) return alert(data);
    const animals = removeAnimalFromAllAnimals(allAnimals, animalId);
    dispatch(setAnimalDetails(animals));
    return navigate("/animals");
  };

  const displayDialogBox = () => {
    dispatch(setDeleteDialogBoxDisplay(true));
  };

  return (
    <Fragment>
      {deleteDialogBox && <DialogBox handleDelete={deleteAnimalHandler} />}
      <Details
        image={photo_url ? photo_url : placeholderImg(animal_type)}
        name={identifier}
        editLink={`/animals/edit`}
        editLinkState={{ page: "editAnimal", animalId: id }}
        deleteFunction={displayDialogBox}
        details={
          <Fragment>
            <h2>{identifier}</h2>
            <h2>Animal: {capitalizeFirstLetter(animal_type)}</h2>
            <h2>Breed: {breed}</h2>
            <h2>
              {" "}
              {animal_status === "born_on_farm" ? "Born" : "Purchased"} on{" "}
              {moment(date).format("Do MMMM YYYY")}
            </h2>
            <h2>Gender: {capitalizeFirstLetter(gender)}</h2>
            <h2>Remarks: {remarks}</h2>
            <h2>Parent Details: </h2>
            {dam_name && <h2>Mother: {capitalizeFirstLetter(dam_name)}</h2>}
            {dam_breed && (
              <h2>Mother's Breed: {capitalizeFirstLetter(dam_breed)}</h2>
            )}
            {bull_name && <h2>Father: {capitalizeFirstLetter(bull_name)}</h2>}
            {bull_breed && (
              <h2>Father's Breed: {capitalizeFirstLetter(bull_breed)}</h2>
            )}
          </Fragment>
        }
        moreDetails={
          <ol>
            {milkData.map((m) => {
              const { date, quantity, time } = m;
              return (
                <li key={m.id}>
                  {parseDate(date)} - {time} - {quantity} L
                </li>
              );
            })}
          </ol>
        }
      />
    </Fragment>
  );
};

export default Animal;
