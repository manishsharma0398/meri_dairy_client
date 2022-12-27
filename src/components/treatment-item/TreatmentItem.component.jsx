import moment from "moment";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteTreatmentData,
  setTreatmentData,
} from "../../store/treatment/treatment-action-creator";
import { getAnimalNameById } from "../../utils/selectAnimal";

import TableActions from "../table-actions/TableActions.component";

const TreatmentItem = ({ treatment, slNo }) => {
  const { treatmentData } = useSelector((state) => state.treatment);
  const dispatch = useDispatch();
  const { id, date, medicine_with_quantity, disease, animal_id } = treatment;

  const deleteTreatmentHandler = async (id) => {
    console.log("delete treatment handler");
    const { error } = await deleteTreatmentData(id);
    if (error) return;
    const updTreatmentRecords = treatmentData.filter((m) => m.id !== id);
    dispatch(setTreatmentData(updTreatmentRecords));
  };

  return (
    <tr>
      <td>{slNo}</td>
      <td>{`${getAnimalNameById(animal_id)}`}</td>
      <td>{moment(date).format("MMM Do YY")}</td>
      <td>{disease}</td>
      <td>{medicine_with_quantity}</td>
      <td>
        <TableActions
          deleteHandler={deleteTreatmentHandler}
          editLink="/treatment/edit"
          editLinkState={{ page: "editTreatment", treatmentId: id }}
        />
      </td>
    </tr>
  );
};

export default TreatmentItem;
