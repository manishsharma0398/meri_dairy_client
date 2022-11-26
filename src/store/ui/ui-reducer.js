import {
  SET_DELETE_DIALOG_BOX_DATA,
  SET_DELETE_DIALOG_BOX_DISPLAY,
  SET_FULLBODY_SPINNER,
  SET_IMAGE_PATH,
  SET_UI_ERRORS,
} from "./ui-action-types";

const INITIAL_STATE = {
  deleteDialogBox: false,
  deleteDialogBoxData: null,
  errors: [],
  imgPath: "",
  showFullBodySpinner: false,
};

export const UIReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_DELETE_DIALOG_BOX_DISPLAY:
      return {
        ...state,
        deleteDialogBox: payload,
      };

    case SET_DELETE_DIALOG_BOX_DATA:
      return {
        ...state,
        deleteDialogBoxData: payload,
      };

    case SET_UI_ERRORS:
      return { ...state, errors: payload };

    case SET_IMAGE_PATH:
      return { ...state, imgPath: payload };

    case SET_FULLBODY_SPINNER:
      return { ...state, showFullBodySpinner: payload };

    default:
      return state;
  }
};
