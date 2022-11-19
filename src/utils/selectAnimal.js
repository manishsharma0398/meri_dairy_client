import { store } from "../store/store";

const { allAnimals } = store.getState().animals;

export const getAnimalNameById = (animalId) => {
  return allAnimals.find((animal) => animal.id === animalId).identifier;
};
