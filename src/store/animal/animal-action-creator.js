import axios from "axios";
import { createSelector } from "reselect";

import { SET_ANIMAL_DETAILS } from "./animal-action-types";

const selectAnimalsReducer = (state) => state.animals;
export const selectAllAnimals = createSelector(
  [selectAnimalsReducer],
  (animals) => animals.allAnimals
);

export const setAnimalDetails = (animalDetails) => ({
  type: SET_ANIMAL_DETAILS,
  payload: animalDetails,
});

export const addNewAnimal = async (animalDetails) => {
  try {
    const animalData = await axios.post("/animals/add", animalDetails);
    return { ...animalData.data, error: false };
  } catch (err) {
    return { ...err.response, error: true };
  }
};

export const getAllAnimals = async () => {
  try {
    const animalData = await axios.get("/animals/all");
    return { ...animalData.data, error: false };
  } catch (err) {
    return { ...err.response, error: true };
  }
};

export const updateAnimal = async (animalDetails, animalId) => {
  try {
    await axios.put(`/animals/${animalId}`, animalDetails);
    return { error: false, message: "Animal Record Added Successfully" };
  } catch (err) {
    return { ...err.response, error: true };
  }
};

export const deleteAnimal = async (animalId) => {
  try {
    await axios.delete(`/animals/${animalId}`);
    return { error: false, message: "Animal Deleted" };
  } catch (err) {
    return { ...err.response, error: true };
  }
};

export const removeAnimalFromAllAnimals = async (animals, animalId) => {
  // console.log(selectAllAnimals);
  return animals.filter((animal) => animal.id !== animalId);
};
