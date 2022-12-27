import { store } from "../store/store";

export const getAnimalNameById = (animalId) => {
  const { allAnimals } = store.getState().animals;

  if (allAnimals.length > 0) {
    const a = allAnimals.filter((animal) => animal.id === animalId);
    const animalIdentifier = a[0].identifier;
    return animalIdentifier;
  }

  return "";
};
