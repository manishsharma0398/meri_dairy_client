import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import moment from "moment";

import {
  getMatingData,
  setMatingData,
  deleteMatingData,
} from "../../store/mating/mating-action-creator";

const Mating = () => {
  const dispatch = useDispatch();
  const { matingData } = useSelector((state) => state.mating);

  const fetchMatingData = async () => {
    const { error, data } = await getMatingData();
    if (error) return;
    dispatch(setMatingData(data));
  };

  useEffect(() => {
    fetchMatingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteMatingHandler = async (id) => {
    console.log("delete mating handler");
    const { error } = await deleteMatingData(id);
    if (error) return;
    const updtMatingRecords = matingData.filter((m) => m.id !== id);
    dispatch(setMatingData(updtMatingRecords));
  };

  return (
    <div>
      <Link
        state={{ page: "addMating", matingId: null }}
        className="btn btn-link"
        to="/mating/add"
      >
        Add Mating Record
      </Link>

      {matingData &&
        matingData.map((mate) => {
          const {
            id,
            a_id,
            date,
            bull_or_ai,
            bull_or_semen_name,
            bull_or_semen_id,
            breed,
            semen_brand,
            cost,
            success,
          } = mate;
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
                  state={{ page: "editMating", matingId: id }}
                  to={`/mating/edit`}
                >
                  <FiEdit3 className="act" style={{ color: "blue" }} />{" "}
                </Link>
                <FiTrash2
                  onClick={() => deleteMatingHandler(id)}
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

export default Mating;
