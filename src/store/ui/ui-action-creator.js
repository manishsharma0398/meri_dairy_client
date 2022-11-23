import {
  SET_ANIMAL_DELETE_DIALOG_BOX,
  SET_IMAGE_PATH,
  SET_UI_ERRORS,
} from "./ui-action-types";

export const showDeleteAnimalModal = (data) => ({
  payload: data,
  type: SET_ANIMAL_DELETE_DIALOG_BOX,
});

export const setFormErrors = (data) => ({
  payload: data,
  type: SET_UI_ERRORS,
});

export const setImagePath = (img) => ({
  payload: img,
  type: SET_IMAGE_PATH,
});
