import moment from "moment";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteHealthData,
  setHealthData,
} from "../../store/health/health-action-creator";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { getAnimalNameById } from "../../utils/selectAnimal";

import TableActions from "../table-actions/TableActions.component";

const HealthItem = ({ health }) => {
  const { id, animal_id, treatment_type, date, medicine } = health;

  const { healthRecords } = useSelector((state) => state.health);
  const dispatch = useDispatch();

  const deleteHealthHandler = async (id) => {
    const { error } = await deleteHealthData(id);
    if (error) return;
    const updMilkRecords = healthRecords.filter((m) => m.id !== id);
    dispatch(setHealthData(updMilkRecords));
  };

  return (
    <tr>
      <td>{moment(date).format("DD-MM-YYYY")}</td>
      <td>{getAnimalNameById(animal_id)}</td>
      <td>{capitalizeFirstLetter(treatment_type)}</td>
      <td>{medicine}</td>
      <td>
        <TableActions
          deleteHandler={deleteHealthHandler}
          editLink="/health/edit"
          editLinkState={{ page: "editHealth", healthId: id }}
        />
      </td>
    </tr>
  );
};

export default HealthItem;
