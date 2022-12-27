import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { parseMatingDate } from "../../utils/dateParser";
import {
  deleteAnimal,
  removeAnimalFromAllAnimals,
} from "../../store/animal/animal-action-creator";
import { setDeleteDialogBoxDisplay } from "../../store/ui/ui-action-creator";
import { placeholderImg } from "../../utils/placeholderImage";
import { parseDate } from "../../utils/dateParser";

import Details from "../../components/details/Details.component";
import DialogBox from "../../components/dialog-box/DialogBox.component";

import { getAnimalNameById } from "../../utils/selectAnimal";

const MatingDetails = () => {
  const [matingDetails, setMatingDetails] = useState({
    id: "",
    date: "",
    a_id: "",
    bull_or_ai: "",
    bull_or_semen_name: "",
    bull_or_semen_id: "",
    breed: "",
    semen_brand: "",
    cost: "",
    success: "",
    photo_url: "",
  });
  const params = useParams();
  const { matingId } = params;

  const dispatch = useDispatch();

  const { matingData } = useSelector((state) => state.mating);
  const { deleteDialogBox } = useSelector((state) => state.UI);

  useEffect(() => {
    const mate = matingData.filter(
      (mating) => mating.id.toString() === matingId.toString()
    );
    setMatingDetails(mate[0]);
    console.log(mate[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayDialogBox = () => {
    dispatch(setDeleteDialogBoxDisplay(true));
  };

  const deleteMatingHandler = () => {};

  const {
    id,
    date,
    a_id,
    bull_or_ai,
    bull_or_semen_name,
    bull_or_semen_id,
    breed,
    semen_brand,
    cost,
    success,
    photo_url,
  } = matingDetails;

  return (
    <Fragment>
      {deleteDialogBox && <DialogBox handleDelete={deleteMatingHandler} />}
      <Details
        image="as"
        // image={placeholderImg(getAnimalNameById(a_id))}
        name="as"
        // name={getAnimalNameById(+a_id)}
        editLink={`/mating/edit`}
        editLinkState={{ page: "editMating", matingId: id }}
        deleteFunction={displayDialogBox}
        details={
          <Fragment>
            <h2>Date: {moment(date).format("Do MMMM YYYY")}</h2>
            <h2>
              Expected Delivery Date: {`${parseMatingDate(parseDate(date))}`}
            </h2>
            <h2>Breed: {breed}</h2>
            <h2>Type: {bull_or_ai === "ai" ? "AI" : "Bull"}</h2>
            <h2>
              {bull_or_semen_id && bull_or_ai === "ai"
                ? "Semen ID - "
                : "Bull ID - "}
              {bull_or_semen_id && bull_or_semen_id}
            </h2>
            <h2>{bull_or_semen_name && "Bull Name - " + bull_or_semen_name}</h2>
            <h2>{semen_brand && "Semen Brand: " + semen_brand}</h2>
            <h2>Mating Status - {success ? "Success" : "Failed"}</h2>
            <h2>Cost: {cost}</h2>

            {/* <h2>{getAnimalNameById(a_id)}</h2> */}
            {/* <h2>Animal: {capitalizeFirstLetter(animal_type)}</h2>
            <h2>Gender: {capitalizeFirstLetter(gender)}</h2>
            <h2>Remarks: {remarks}</h2>
            <h2>Parent Details: </h2>
            {dam_name && <h2>Mother: {capitalizeFirstLetter(dam_name)}</h2>}
            {dam_breed && (
              <h2>Mother's Breed: {capitalizeFirstLetter(dam_breed)}</h2>
            )}
            {bull_name && <h2>Father: {capitalizeFirstLetter(bull_name)}</h2>}
            {bull_breed && (
              <h2>Father's Breed: {capitalizeFirstLetter(bull_breed)}</h2> */}
            {/* )} */}
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default MatingDetails;
