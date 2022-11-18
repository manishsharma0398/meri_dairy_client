import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import moment from "moment";

import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { parseDate } from "../../utils/dateParser";
import { deleteAnimal } from "../../store/animal/animal-action-creator";

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
  const [milkRecords, setMilkRecords] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const { animalId } = params;
  const { allAnimals } = useSelector((state) => state.animals);
  const { milkData } = useSelector((state) => state.milk);

  useEffect(() => {
    const animal = allAnimals.filter(
      (a) => a.id.toString() === animalId.toString()
    );
    setAnimalDetails(animal[0]);

    const thisAnimalMilkRecords = milkData.filter(
      (a) => a.a_id.toString() === animalId.toString()
    );
    setMilkRecords(thisAnimalMilkRecords);

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
    const { error, data } = await deleteAnimal(animalId);
    if (error) return alert(data);
    // const animals = removeAnimalFromAllAnimals(allAnimals, animalId);
    // dispatch(setAnimalDetails(animals));
    return navigate("/animals");
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <h2>{identifier}</h2>
        <div style={{ display: "flex", gap: "50px" }} className="actions">
          <Link
            state={{ page: "editAnimal", animalId: id }}
            to={`/animals/edit`}
          >
            Edit <FiEdit3 className="act" style={{ color: "blue" }} />{" "}
          </Link>
          <div>
            <span>Delete</span>
            <FiTrash2
              onClick={deleteAnimalHandler}
              className="act"
              style={{ color: "red" }}
            />
          </div>
        </div>
        <img width="250px" src={photo_url} alt="" />
        <h2>Animal: {capitalizeFirstLetter(animal_type)}</h2>
        <h2>Gender: {capitalizeFirstLetter(gender)}</h2>
        <h2>
          {" "}
          {animal_status === "born_on_farm" ? "Born" : "Purchased"} on{" "}
          {moment(date).format("Do MMMM YYYY")}
        </h2>
        <h2>Breed: {breed}</h2>
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
      </div>
      <div>
        <h2>Milk Records</h2>
        {milkRecords && (
          <ol>
            {milkRecords.map((m) => {
              const { date, quantity, time } = m;
              return (
                <li key={m.id}>
                  {parseDate(date)} - {time} - {quantity} L
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
};

export default Animal;
