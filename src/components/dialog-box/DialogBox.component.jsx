import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setDeleteDialogBoxDisplay,
  setDeleteDialogBoxData,
} from "../../store/ui/ui-action-creator";
import {
  deleteAnimal,
  removeAnimalFromAllAnimals,
} from "../../store/animal/animal-action-creator";
import { deleteMilkData } from "../../store/milk/milk-action-creator";
import { deleteHealthData } from "../../store/health/health-action-creator";
import { deleteWorkerData } from "../../store/worker/worker-action-creator";
import { deleteTransaction } from "../../store/transaction/transaction-action-creator";
import { deleteTreatmentData } from "../../store/treatment/treatment-action-creator";
import { deleteMatingData } from "../../store/mating/mating-action-creator";

import "./Dialogbox.styles.scss";

const DialogBox = ({ handleDelete }) => {
  const dispatch = useDispatch();
  const { deleteDialogBoxData } = useSelector((state) => state.UI);

  const handleDeleteFunction = () => {
    // return removeAnimalFromAllAnimals(id);
    const { table, id } = deleteDialogBoxData;
    return removeAnimalFromAllAnimals(id);
    // if (table === "animal") return deleteAnimal(id);
    if (table === "animal") return removeAnimalFromAllAnimals(id);
    if (table === "milk") return deleteMilkData(id);
    if (table === "health") return deleteHealthData(id);
    if (table === "worker") return deleteWorkerData(id);
    if (table === "transaction") return deleteTransaction(id);
    if (table === "treatment") return deleteTreatmentData(id);
    if (table === "mating") return deleteMatingData(id);

    closeDeleteDialogBoxHandler();
  };

  //   // TODO: define in a separate file
  //   if (e.target.className === "delete-animal") {
  //     const { error, data } = await deleteAnimal(animalId);
  //     if (error) return alert(data);
  //     const animals = removeAnimalFromAllAnimals(allAnimals, animalId);
  //     dispatch(setAnimalDetails(animals));
  //     return dispatch(showDeleteDialogBox(false));
  //   }
  // };

  const closeDeleteDialogBoxHandler = () => {
    dispatch(setDeleteDialogBoxDisplay(false));
    dispatch(setDeleteDialogBoxData(null));
  };

  return (
    <div className="dialog-box">
      <div className="dialog-box-body">
        <h2>Are You Sure You want to delete ?</h2>
        <div className="dialog-box-body-actions">
          {/* <button onClick={handleDeleteFunctions} className="delete-animal"> */}
          <button onClick={handleDelete} className="delete-animal">
            Delete
          </button>
          <button onClick={closeDeleteDialogBoxHandler} className="hide-modal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
