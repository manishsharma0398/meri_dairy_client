import {
  SET_DELETE_DIALOG_BOX_DISPLAY,
  SET_DELETE_DIALOG_BOX_DATA,
  SET_FULLBODY_SPINNER,
  SET_IMAGE_PATH,
  SET_UI_ERRORS,
} from "./ui-action-types";

export const setDeleteDialogBoxDisplay = (display) => ({
  payload: display,
  type: SET_DELETE_DIALOG_BOX_DISPLAY,
});

export const setDeleteDialogBoxData = (data) => ({
  payload: data,
  type: SET_DELETE_DIALOG_BOX_DATA,
});

export const setFormErrors = (data) => ({
  payload: data,
  type: SET_UI_ERRORS,
});

export const setImagePath = (img) => ({
  payload: img,
  type: SET_IMAGE_PATH,
});

export const setSpinnerHandler = (boolean) => ({
  payload: boolean,
  type: SET_FULLBODY_SPINNER,
});
