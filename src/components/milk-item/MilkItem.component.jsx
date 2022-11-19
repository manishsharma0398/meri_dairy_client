import moment from "moment";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

import {
  deleteMilkData,
  setMilkData,
} from "../../store/milk/milk-action-creator";
import { getAnimalNameById } from "../../utils/selectAnimal";

const MilkItem = ({ milk }) => {
  const { milkData } = useSelector((state) => state.milk);
  const dispatch = useDispatch();
  const { a_id, date, id, quantity, time } = milk;

  // const editMilkHandler = (e) => {
  //   e.preventDefault();
  //   console.log("update");
  // };
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
      <td>{getAnimalNameById(a_id)}</td>
      <td>{time}</td>
      <td>{moment(date).format("MMM Do YY")}</td>
      <td>{quantity} L</td>
      <td>
        <div className="actions">
          <Link
            state={{ page: "editMilk", milkId: id }}
            to={`/milk/edit/${id}`}
          >
            <FiEdit3 className="act" style={{ color: "blue" }} />{" "}
          </Link>
          <FiTrash2
            onClick={deleteMilkHandler}
            className="act"
            style={{ color: "red" }}
          />
        </div>
      </td>
    </tr>
  );
};

export default MilkItem;
