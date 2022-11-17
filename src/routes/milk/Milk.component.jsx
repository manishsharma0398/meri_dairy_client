import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import MilkItem from "../../components/milk-item/MilkItem.component";

import { getMilkData, setMilkData } from "../../store/milk/milk-action-creator";

// import DialogBox from "../../components/dialog-box/DialogBox.component";

const Milk = () => {
  const dispatch = useDispatch();
  const [err, setErr] = useState(null);
  const { milkData } = useSelector((state) => state.milk);
  // const { showDeleteDialogBox } = useSelector((state) => state.UI);

  const getAllMilkRecords = async () => {
    console.log("Fetching all milk records");
    const animalData = await getMilkData();
    const { data, error } = animalData;

    if (error) return setErr(error);

    setErr(null);
    dispatch(setMilkData(data));
  };

  useEffect(() => {
    getAllMilkRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <th>Animal Name</th>
              <th>Time</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {milkData.map((milk) => (
              <MilkItem key={milk.id} milk={milk} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Milk;
