import { SET_ANIMAL_DELETE_DIALOG_BOX } from "./ui-action-types";

export const showDeleteAnimalModal = (data) => ({
  payload: data,
  type: SET_ANIMAL_DELETE_DIALOG_BOX,
});
