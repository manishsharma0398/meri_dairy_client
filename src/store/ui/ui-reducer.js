import { SET_ANIMAL_DELETE_DIALOG_BOX } from "./ui-action-types";

const INITIAL_STATE = {
  showDeleteDialogBox: false,
  animalId: null,
};

export const UIReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ANIMAL_DELETE_DIALOG_BOX:
      const { display, id } = payload;
      return { ...state, showDeleteDialogBox: display, animalId: id };

    default:
      return state;
  }
};
