import { SET_ANIMAL_DETAILS } from "./animal-action-types";

const INITIAL_STATE = {
  allAnimals: null,
};

export const animalReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ANIMAL_DETAILS:
      return { ...state, allAnimals: payload };

    default:
      return state;
  }
};
