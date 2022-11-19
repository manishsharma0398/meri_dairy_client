import { store } from "../store/store";

const { allAnimals } = store.getState().animals;

export const getAnimalNameById = (animalId) => {
  return allAnimals
    ? allAnimals.find((animal) => animal.id === animalId).identifier
    : "";
};
