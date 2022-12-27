import moment from "moment";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteMatingData,
  setMatingData,
} from "../../store/mating/mating-action-creator";
import { parseMatingDate } from "../../utils/dateParser";
import { getAnimalNameById } from "../../utils/selectAnimal";

import TableActions from "../table-actions/TableActions.component";

const MatingItem = ({ mating }) => {
  const { matingData } = useSelector((state) => state.mating);
  const dispatch = useDispatch();

  const {
    id,
    date,
    a_id,
    bull_or_ai,
    // bull_or_semen_name,
    // bull_or_semen_id,
    breed,
    // semen_brand,
    // cost,
    // success,
  } = mating;

  const deleteMatingHandler = async (id) => {
    console.log("delete mating handler");
    const { error } = await deleteMatingData(id);
    if (error) return;
    const updtMatingRecords = matingData.filter((m) => m.id !== id);
    dispatch(setMatingData(updtMatingRecords));
  };

  return (
    <tr>
      <td>{`${getAnimalNameById(a_id)}`}</td>
      <td>{moment(date).format("MMM Do YY")}</td>
      <td>{bull_or_ai === "bull" ? "Bull" : "AI"}</td>
      <td>{breed}</td>
      <td>{parseMatingDate(date)}</td>
      <td>
        <TableActions
          deleteHandler={deleteMatingHandler}
          editLink="/mating/edit"
          editLinkState={{ page: "editMating", matingId: id }}
          previewLink={`/mating/${id}`}
        />
      </td>
    </tr>
  );
};

export default MatingItem;
