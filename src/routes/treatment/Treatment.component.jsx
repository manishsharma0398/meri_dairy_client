import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import moment from "moment";

import {
  setTreatmentData,
  deleteTreatmentData,
} from "../../store/treatment/treatment-action-creator";

const Treatment = () => {
  const dispatch = useDispatch();
  const { treatmentData } = useSelector((state) => state.treatment);

  // const getTreatment = async () => {
  //   const { error, data } = await getTreatmentData();
  //   if (error) return;
  //   dispatch(setTreatmentData(data));
  // };

  const deleteTreatmentHandler = async (id) => {
    console.log("delete treatment handler");
    const { error } = await deleteTreatmentData(id);
    if (error) return;
    const updTreatmentRecords = treatmentData.filter((m) => m.id !== id);
    dispatch(setTreatmentData(updTreatmentRecords));
  };

  return (
    <div>
      <Link
        state={{ page: "addTreatment", treatmentId: null }}
        className="btn btn-link"
        to="/treatment/add"
      >
        Add Treatment
      </Link>

      {treatmentData &&
        treatmentData.map((treat) => {
          const {
            id,
            date,
            // animal_id,
            // vet_name,
            // medicine_with_quantity,
            // disease,
            // disease_remarks,
            // treatment_remarks,
            // cost,
          } = treat;
          return (
            <div
              style={{
                border: "1px solid gray",
                marginBottom: "10px",
                padding: "10px",
              }}
              key={id}
            >
              <div className="actions">
                <Link
                  state={{ page: "editTreatment", treatmentId: id }}
                  to={`/treatment/edit`}
                >
                  <FiEdit3 className="act" style={{ color: "blue" }} />{" "}
                </Link>
                <FiTrash2
                  onClick={() => deleteTreatmentHandler(id)}
                  className="act"
                  style={{ color: "red" }}
                />
              </div>
              {/* <h2>
                {title} - ₹ {amount}
              </h2> */}
              <h2>Date: {moment(date).format("dddd Do MMMM YYYY")}</h2>
              {/* <h2>Type: {type}</h2> */}
              {/* <h2>Mode: {mode}</h2> */}
              {/* <h2>Remarks: {remarks}</h2> */}
            </div>
          );
        })}
    </div>
  );
};

export default Treatment;
