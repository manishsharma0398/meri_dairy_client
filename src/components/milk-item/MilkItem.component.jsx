import moment from "moment";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteMilkData,
  setMilkData,
} from "../../store/milk/milk-action-creator";
import { getAnimalNameById } from "../../utils/selectAnimal";

import TableActions from "../table-actions/TableActions.component";

const MilkItem = ({ milk, slNo }) => {
  const { milkData } = useSelector((state) => state.milk);
  const dispatch = useDispatch();
  const { a_id, date, id, quantity, time } = milk;

  const deleteMilkHandler = async (e) => {
    e.preventDefault();
    console.log("delete");
    const { error } = await deleteMilkData(id);
    if (error) return;
    const updMilkRecords = milkData.filter((m) => m.id !== id);
    console.log(updMilkRecords);
    dispatch(setMilkData(updMilkRecords));
  };

  return (
    <tr>
      <td>{slNo}</td>
      <td>{`${getAnimalNameById(a_id)}`}</td>
      <td>{time}</td>
      <td>{moment(date).format("MMM Do YY")}</td>
      <td>{quantity} L</td>
      <td>
        <TableActions
          deleteHandler={deleteMilkHandler}
          editLink="/milk/edit"
          editLinkState={{ page: "editMilk", milkId: id }}
        />
      </td>
    </tr>
  );
};

export default MilkItem;
