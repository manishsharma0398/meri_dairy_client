import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getMilkData, setMilkData } from "../../store/milk/milk-action-creator";

import MilkItem from "../../components/milk-item/MilkItem.component";
import Spinner from "../../components/spinner/Spinner.component";

const Milk = () => {
  const dispatch = useDispatch();
  const [err, setErr] = useState(null);
  const { milkData } = useSelector((state) => state.milk);

  const getAllMilkRecords = async () => {
    const animalData = await getMilkData();
    const { data, error } = animalData;
    if (error) return setErr(error);
    setErr(null);
    dispatch(setMilkData(data));
  };

  return (
    <div className="s">
      {/* {showDeleteDialogBox && <DialogBox />} */}
      {!milkData && !err && <h2>Loading...</h2>}
      {milkData && milkData.length === 0 && (
        <h2>No Milk Records. Please add one</h2>
      )}
      {!err && (
        <Link
          state={{ page: "addMilk", milkId: null }}
          className="btn btn-link"
          to="/milk/add"
        >
          Add Milk Record
        </Link>
      )}
      {err && (
        <div>
          <h2 className="err-msg">Something went wrong. Please try again</h2>
          <Link onClick={getAllMilkRecords} className="btn btn-link">
            Refresh Page
          </Link>
        </div>
      )}
      {milkData && milkData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Animal</th>
              <th>Time</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {milkData.map((milk, i) => (
              <MilkItem key={milk.id} milk={milk} slNo={i + 1} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Milk;
