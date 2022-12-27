import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import DialogBox from "../../components/dialog-box/DialogBox.component";
import MatingItem from "../../components/mating-item/MatingItem.component";

const Mating = () => {
  const { matingData } = useSelector((state) => state.mating);
  const { deleteDialogBox } = useSelector((state) => state.UI);

  // const fetchMatingData = async () => {
  //   const { error, data } = await getMatingData();
  //   if (error) return;
  //   dispatch(setMatingData(data));
  // };

  return (
    <div className="content">
      {deleteDialogBox && <DialogBox />}
      {!matingData && <h2>Loading...</h2>}
      {matingData && matingData.length === 0 && (
        <h2>No Mating Records. Please add one</h2>
      )}
      {matingData && (
        <Link
          state={{ page: "addMating", matingId: null }}
          className="btn btn-link"
          to="/mating/add"
        >
          Add Mating Record
        </Link>
      )}

      {!matingData && (
        <div>
          <h2 className="err-msg">Something went wrong. Please try again</h2>
          <Link
            // onClick={getAllM}
            className="btn btn-link"
          >
            Refresh Page
          </Link>
        </div>
      )}

      {matingData && matingData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Animal</th>
              <th>Date</th>
              <th>Type</th>
              <th>Breed</th>
              <th>Delivery</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {matingData.map((mating, i) => (
              <MatingItem key={mating.id} mating={mating} slNo={i + 1} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Mating;
