import { SET_ANIMAL_DETAILS } from "./animal-action-types";

export const setAnimalDetails = (animalDetails) => {
  return {
    type: SET_ANIMAL_DETAILS,
    payload: animalDetails,
  };
};
