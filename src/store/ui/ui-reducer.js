import {
  SET_ANIMAL_DELETE_DIALOG_BOX,
  SET_IMAGE_PATH,
  SET_UI_ERRORS,
} from "./ui-action-types";

const INITIAL_STATE = {
  showDeleteDialogBox: false,
  animalId: null,
  errors: [],
  imgPath: "",
};

export const UIReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ANIMAL_DELETE_DIALOG_BOX:
      const { display, id } = payload;
      return { ...state, showDeleteDialogBox: display, animalId: id };

    case SET_UI_ERRORS:
      return { ...state, errors: payload };

    case SET_IMAGE_PATH:
      return { ...state, imgPath: payload };

    default:
      return state;
  }
};
