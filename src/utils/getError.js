import { store } from "../store/store";

export const inputError = (inputId) => {
  const { errors } = store.getState().UI;

  if (errors.length > 0) {
    const a = errors.filter(
      (err) => err.path.toString() === inputId.toString()
    );

    if (a.length > 0) return a[0].message;
    return false;
  }

  return "";
};
