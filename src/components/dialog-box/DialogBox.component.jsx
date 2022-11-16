import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { showDeleteAnimalModal } from "../../store/ui/ui-action-creator";
import {
  deleteAnimal,
  removeAnimalFromAllAnimals,
  setAnimalDetails,
} from "../../store/animal/animal-action-creator";

import "./Dialogbox.styles.scss";

const DialogBox = () => {
  const dispatch = useDispatch();
  const { animalId } = useSelector((state) => state.UI);
  const { allAnimals } = useSelector((state) => state.animals);

  const handleClick = async (e) => {
    e.preventDefault();
    if (e.target.className === "hide-modal") {
      return dispatch(
        showDeleteAnimalModal({ display: false, animalId: null })
      );
    }

    if (e.target.className === "delete-animal") {
      const { error, data } = await deleteAnimal(animalId);
      if (error) return alert(data);
      const animals = removeAnimalFromAllAnimals(allAnimals, animalId);
      dispatch(setAnimalDetails(animals));
      return dispatch(
        showDeleteAnimalModal({ display: false, animalId: null })
      );
    }
  };

  return (
    <div className="dialog-box">
      <div className="dialog-box-body">
        <h2>Are You Sure You want to delete ?</h2>
        <div className="dialog-box-body-actions">
          <button onClick={handleClick} className="delete-animal">
            Delete
          </button>
          <button onClick={handleClick} className="hide-modal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
