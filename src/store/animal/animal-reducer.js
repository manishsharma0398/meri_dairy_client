import { SET_ANIMAL_DETAILS, SET_ANIMAL_ERROR } from "./animal-action-types";

const INITIAL_STATE = {
  allAnimals: null,
  animal: null,
  animalError: null,
};

export const animalReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ANIMAL_DETAILS:
      return { ...state, allAnimals: payload };

    case SET_ANIMAL_ERROR:
      return { ...state, animalError: payload };

    default:
      return state;
  }
};
