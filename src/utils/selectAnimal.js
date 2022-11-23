import { store } from "../store/store";

export const getAnimalNameById = (animalId) => {
  const { allAnimals } = store.getState().animals;
  return allAnimals
    ? allAnimals.find((animal) => animal.id === animalId).identifier
    : "";
};
